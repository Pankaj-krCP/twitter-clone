import prisma from "@/db/connect";

const getAllPost = async () => {
  const posts = await prisma.post.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
  return posts;
};

export default getAllPost;
