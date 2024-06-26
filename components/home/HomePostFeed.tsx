import useAllPost from "@/hooks/useAllPost";
import React from "react";
import Feed from "../common/Feed";

const HomePostFeed = () => {
  const { data: allPost } = useAllPost();
  return (
    <>
      {allPost?.map((item: any, index: number) => {
        return (
          <div key={index}>
            <Feed
              userId={item?.userId}
              postId={item?.id}
              createdAt={item?.createdAt}
              body={item?.body}
              commentLength={item?.comments?.length}
              likeIds={item?.likeIds}
            />
          </div>
        );
      })}
    </>
  );
};

export default HomePostFeed;
