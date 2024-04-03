import useSinglePost from "@/hooks/useSinglePost";
import { useRouter } from "next/router";
import React from "react";
import toast from "react-hot-toast";
import { ClipLoader } from "react-spinners";
import Feed from "../common/Feed";
import Form from "../common/Form";

const Comment = () => {
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
    <>
      <Form
        isComment={true}
        placeholder="Replying..."
        postId={postId as string}
      />
      {singlePost?.comments?.map((item: any, index: number) => {
        return (
          <Feed
            key={index}
            userId={item?.userId}
            commentId={item?.id}
            postId={postId as string}
            createdAt={item?.createdAt}
            body={item?.body}
          />
        );
      })}
    </>
  );
};

export default Comment;
