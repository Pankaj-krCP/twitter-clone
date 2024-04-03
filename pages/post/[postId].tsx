import Header from "@/components/common/Header";
import Comment from "@/components/post/Comment";
import MainPost from "@/components/post/MainPost";

const SinglePost = () => {
  return (
    <>
      <Header label={"Go Back"} showBackArrow={true} />
      <MainPost />
      <Comment />
    </>
  );
};

export default SinglePost;
