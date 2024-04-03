import prisma from "@/libs/connect";

const deleteComment = async (userId: string, commentId: string) => {
  const post = await prisma.comment.delete({
    where: {
      id: commentId,
      userId: userId,
    },
  });

  return post;
};

export default deleteComment;
