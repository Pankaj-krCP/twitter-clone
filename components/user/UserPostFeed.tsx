import React from "react";
import Feed from "../common/Feed";
import useUserPost from "@/hooks/useUserPost";
import { useRouter } from "next/router";

const UserPostFeed = () => {
  const router = useRouter();
  const { userId } = router.query;
  const { data: allPost } = useUserPost(userId as string);

  return (
    <>
      {allPost?.map((item: any, index: number) => {
        return (
          <Feed
            key={index}
            userId={item?.userId}
            postId={item?.id}
            createdAt={item?.createdAt}
            body={item?.body}
          />
        );
      })}
    </>
  );
};

export default UserPostFeed;
