import prisma from "@/libs/connect";

const getAllPost = async () => {
  const posts = await prisma.post.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      comments: true,
    },
  });
  return posts;
};

export default getAllPost;
