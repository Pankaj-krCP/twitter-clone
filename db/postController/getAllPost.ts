import prisma from "@/db/connect";

const getAllPost = async () => {
  const post = await prisma?.post.findMany();
  return post;
};

export default getAllPost;
