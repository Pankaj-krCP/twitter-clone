import useUser from "@/hooks/useUser";
import React from "react";
import Avatar from "../common/Avatar";

interface NotificationFeedProps {
  body: string;
}

const NotificationFeed: React.FC<NotificationFeedProps> = ({ body }) => {
  const array = body.split(" ");
  const { data: fetchedUser, isLoading } = useUser(array[0]);

  return (
    <>
      {isLoading ? (
        <div className="animate-pulse bg-gray-800 h-10"></div>
      ) : (
        <>
          <div className="flex flex-row items-center p-6 gap-4 border-b-[1px] border-neutral-800">
            <Avatar userId={array[0]} />
            <p className="text-sky-500">{fetchedUser?.username}</p>
            <p className="text-white">{array.splice(1).join(" ")}</p>
          </div>
        </>
      )}
    </>
  );
};

export default NotificationFeed;
