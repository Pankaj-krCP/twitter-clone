import prisma from "@/db/connect";

const createPost = async (userId: string, body: string) => {
  const post = await prisma.post.create({
    data: {
      body,
      userId,
    },
  });

  console.log(post);
  return post;
};

export default createPost;
