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
import { useRouter } from "next/router";
import useSinglePost from "@/hooks/useSinglePost";

interface FeedProps {
  userId: string;
  postId: string;
  commentId?: string;
  createdAt: string;
  body?: string;
  commentLength?: number;
  likeIds?: string[];
}

const Feed: React.FC<FeedProps> = ({
  userId,
  postId,
  commentId,
  createdAt,
  body,
  commentLength,
  likeIds,
}) => {
  const router = useRouter();
  const [openOption, setOpenOption] = useState(false);
  const [alreadyLiked, setAlreadyLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(likeIds?.length);
  const { data: fetchedUser } = useUser(userId as string);
  const { data: currentUser } = useCurrentUser();
  const { mutate: mutatePost } = useAllPost();
  const { mutate: mutateSinglePost } = useSinglePost(postId as string);

  const handleDelete = useCallback(async () => {
    if (commentId) {
      await axios.delete("/api/comment/delete", { data: { commentId } });
      setOpenOption(false);
      mutateSinglePost();
      toast.success("Comment Deleted");
    } else {
      await axios.delete("/api/post/delete", { data: { postId } });
      setOpenOption(false);
      mutatePost();
      toast.success("Tweet Deleted");
    }
  }, [postId, commentId, mutatePost, mutateSinglePost]);

  const handleLike = useCallback(async () => {
    try {
      if (!commentId) {
        await axios.patch("/api/post/like", { postId, userId: fetchedUser.id });
        if (likeCount) {
          if (alreadyLiked) {
            setLikeCount(likeCount - 1);
            toast.success("Like Removed!");
          } else {
            setLikeCount(likeCount + 1);
            toast.success("Like Added!");
          }
        } else {
          setLikeCount(1);
          toast.success("Like Added!");
        }
        setAlreadyLiked(!alreadyLiked);
      }
    } catch (error) {
      toast.error("Something Went Wrong!");
    }
  }, [commentId, fetchedUser, postId, likeCount, alreadyLiked]);

  const openFeed = () => {
    router.push(`/post/${postId}`);
  };

  const time = useMemo(() => {
    if (!createdAt) {
      return null;
    }
    return formatDistanceToNowStrict(new Date(createdAt));
  }, [createdAt]);

  useMemo(() => {
    if (likeIds?.includes(fetchedUser?.id)) {
      setAlreadyLiked(true);
    }
  }, [likeIds, fetchedUser]);

  return (
    <div
      className={`${
        commentId ? "pl-4 mt-2" : "mb-2"
      } border-b-[1px] border-neutral-700`}
    >
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
              <div className="flex relative mr-5">
                <div
                  className="cursor-pointer"
                  onClick={() => {
                    setOpenOption(!openOption);
                  }}
                >
                  <SlOptionsVertical color="white" size={12} />
                </div>
                {openOption && (
                  <div className="absolute rounded-md right-5 -top-1 bg-neutral-800 ">
                    <ul>
                      {/* <li className="text-white cursor-pointer border-b-[1px] p-2 px-4 hover:bg-neutral-600 rounded">
                        Edit
                      </li> */}
                      <li
                        className="text-white cursor-pointer p-2 px-4 hover:bg-neutral-600 rounded"
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

          <div
            className={`${
              commentId ? "pb-0 pt-4" : "py-4"
            } text-white cursor-pointer`}
            onClick={openFeed}
          >
            <p>{body}</p>
          </div>
          <div className={`${commentId && "hidden"} flex items-center gap-40`}>
            <div className="flex items-center gap-2">
              <AiOutlineMessage
                onClick={openFeed}
                className="text-neutral-500 cursor-pointer"
                size={20}
              />
              <p className="text-neutral-500">{commentLength}</p>
            </div>
            <div className="flex items-center gap-2">
              {alreadyLiked ? (
                <AiFillHeart
                  onClick={handleLike}
                  className="cursor-pointer text-red-500"
                  size={20}
                />
              ) : (
                <AiOutlineHeart
                  onClick={handleLike}
                  className="text-neutral-500 cursor-pointer hover:text-red-500"
                  size={20}
                />
              )}
              <p className="text-neutral-500">{likeCount}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feed;
