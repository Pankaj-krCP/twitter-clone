import prisma from "@/libs/connect";

const createPost = async (userId: string, body: string) => {
  const post = await prisma.post.create({
    data: {
      body,
      userId,
    },
  });
  return post;
};

export default createPost;
