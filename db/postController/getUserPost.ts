import prisma from "@/libs/connect";

const getUserPost = async (userId: string) => {
  const post = await prisma?.post.findMany({
    where: {
      userId: userId,
    },
    orderBy: {
      updatedAt: "desc",
    },
  });
  return post;
};

export default getUserPost;
