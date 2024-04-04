import Header from "@/components/common/Header";
import Comment from "@/components/post/Comment";
import MainPost from "@/components/post/MainPost";

const SinglePost = () => {
  return (
    <>
      <Header label={"Post"} showBackArrow={true} />
      <MainPost />
      <div className="pb-28">
        <Comment />
      </div>
    </>
  );
};

export default SinglePost;
