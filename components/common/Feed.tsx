import axios from "axios";
import React, { useCallback, useMemo, useState } from "react";
import { formatDistanceToNowStrict } from "date-fns";
import { AiFillHeart, AiOutlineHeart, AiOutlineMessage } from "react-icons/ai";
import { SlOptionsVertical } from "react-icons/sl";
import useUser from "@/hooks/useUser";
import Avatar from "./Avatar";
import useCurrentUser from "@/hooks/useCurrentUser";
import useAllPost from "@/hooks/useAllPost";
import toast from "react-hot-toast";

interface FeedProps {
  userId?: string;
  postId?: string;
  commentId?: string;
  createdAt: string;
  body?: string;
}

const Feed: React.FC<FeedProps> = ({
  userId,
  postId,
  commentId,
  createdAt,
  body,
}) => {
  const [openOption, setOpenOption] = useState(false);
  const { data: fetchedUser } = useUser(userId as string);
  const { data: currentUser } = useCurrentUser();
  const { mutate: mutatePost } = useAllPost();

  const handleDelete = useCallback(async () => {
    console.log(postId);
    if (postId) {
      await axios.delete("/api/post/delete", { data: { postId } });
      setOpenOption(false);
      mutatePost();
      toast.success("Tweet Deleted");
    } else {
      //comment delete logic
    }
  }, [postId, mutatePost]);

  const time = useMemo(() => {
    if (!createdAt) {
      return null;
    }
    return formatDistanceToNowStrict(new Date(createdAt));
  }, [createdAt]);
  return (
    <div className="border-b-[1px] border-neutral-700 mb-2">
      <div className="flex gap-4 p-4 pt-1">
        <div>
          <Avatar userId={userId as string} />
        </div>
        <div className="flex flex-col w-full">
          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              <p className="text-white">{fetchedUser?.name}</p>
              <p className="text-neutral-500">@{fetchedUser?.username}</p>
              <p className="text-neutral-500">• {time}</p>
            </div>

            {currentUser?.id === userId && (
              <div className="flex relative">
                <div
                  className="cursor-pointer"
                  onClick={() => {
                    setOpenOption(!openOption);
                  }}
                >
                  <SlOptionsVertical color="white" size={12} />
                </div>
                {openOption && (
                  <div className="absolute px-2 rounded-md right-5 -top-1 bg-neutral-800">
                    <ul>
                      <li className="text-white cursor-pointer border-b-[1px] p-2">
                        Edit
                      </li>
                      <li
                        className="text-white cursor-pointer p-2"
                        onClick={handleDelete}
                      >
                        Delete
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="text-white py-4">
            <p>{body}</p>
          </div>
          <div className="flex items-center justify-between">
            <AiOutlineMessage className="text-neutral-500" />
            <AiOutlineHeart className="text-neutral-500" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feed;
