import useSinglePost from "@/hooks/useSinglePost";
import { useRouter } from "next/router";
import React from "react";
import toast from "react-hot-toast";
import { ClipLoader } from "react-spinners";
import Feed from "../common/Feed";

const MainPost = () => {
  const router = useRouter();
  const { postId } = router.query;

  const { data: singlePost, isLoading } = useSinglePost(postId as string);
  if (isLoading || !singlePost) {
    if (postId === "undefined") {
      toast.error("Invalid post");
    } else {
      return (
        <div className="flex pt-60 lg:pt-0 items-center justify-center h-full">
          <ClipLoader color="lightblue" size={60} />
        </div>
      );
    }
  }
  return (
    <Feed
      userId={singlePost?.userId}
      postId={singlePost?.id}
      createdAt={singlePost?.createdAt}
      body={singlePost?.body}
      commentLength={singlePost?.comments?.length}
      likeIds={singlePost?.likeIds}
    />
  );
};

export default MainPost;
