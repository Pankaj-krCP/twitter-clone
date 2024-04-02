import React, { useMemo } from "react";
import { formatDistanceToNowStrict } from "date-fns";
import { AiFillHeart, AiOutlineHeart, AiOutlineMessage } from "react-icons/ai";
import useUser from "@/hooks/useUser";
import Avatar from "./Avatar";

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
  const { data: fetchedUser } = useUser(userId as string);

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
          <div className="flex items-center gap-2">
            <p className="text-white">{fetchedUser?.name}</p>
            <p className="text-neutral-500">@{fetchedUser?.username}</p>
            <p className="text-neutral-500">• {time}</p>
          </div>
          <div className="text-white py-4">{body}</div>
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
