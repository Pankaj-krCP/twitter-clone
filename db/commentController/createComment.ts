import prisma from "@/libs/connect";

const createComment = async (userId: string, postId: string, body: string) => {
  const post = await prisma.comment.create({
    data: {
      userId,
      postId,
      body,
    },
  });
  return post;
};

export default createComment;
