import prisma from "@/libs/connect";

const deletePost = async (userId: string, postId: string) => {
  const post = await prisma.post.delete({
    where: {
      id: postId,
      userId: userId,
    },
  });

  return post;
};

export default deletePost;
