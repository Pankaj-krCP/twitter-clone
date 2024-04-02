import prisma from "@/db/connect";

const getSinglePost = async (postId: string) => {
  const post = await prisma?.post.findUnique({
    where: {
      id: postId,
    },
  });
  return post;
};

export default getSinglePost;
