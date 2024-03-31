import React, { useMemo } from "react";
import { format } from "date-fns";
import useCurrentUser from "@/hooks/useCurrentUser";
import useUser from "@/hooks/useUser";
import Button from "../common/Button";
import { BiCalendar } from "react-icons/bi";

interface BioProps {
  userId: string;
}

const Bio: React.FC<BioProps> = ({ userId }) => {
  const { data: currentUser } = useCurrentUser();
  const { data: fetchedUser } = useUser(userId);

  const createdAt = useMemo(() => {
    if (!fetchedUser?.createdAt) {
      return null;
    }
    return format(new Date(fetchedUser?.createdAt), "MMMM yyyy");
  }, [fetchedUser?.createdAt]);

  return (
    <div className="border-b-[1px] border-neutral-800 pb-4">
      <div className="flex justify-end p-2">
        {currentUser?.id === fetchedUser?.id ? (
          <Button secondary label="Edit" onClick={() => {}} />
        ) : (
          <Button secondary label="follow" onClick={() => {}} />
        )}
      </div>
      <div className="px-4 mt-8">
        <div className="flex flex-col">
          <p className="text-white text-2xl font-semibold">
            {fetchedUser?.name}
          </p>
          <p className="text-md text-neutral-500">@{fetchedUser?.username}</p>
        </div>
        <div className="flex flex-col mt-3">
          <p className="text-white">{fetchedUser?.bio}</p>
          <div className="flex gap-2 items-center mt-3 text-neutral-500">
            <BiCalendar size={24} />
            <p>Joined {createdAt}</p>
          </div>
        </div>
        <div className="flex items-center mt-3 gap-5">
          <div className="flex gap-2 items-center">
            <p className="text-white">{fetchedUser?.followingIds?.length}</p>
            <p className="text-neutral-500">Following</p>
          </div>
          <div className="flex gap-2 items-center">
            <p className="text-white">{fetchedUser?.followers?.length}</p>
            <p className="text-neutral-500">Followers</p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Bio;
