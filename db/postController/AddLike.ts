import prisma from "@/libs/connect";

const AddLike = async (postId: string, userId: string) => {
  const post = await prisma.post.findUnique({
    where: {
      id: postId,
    },
  });

  if (!post) {
    throw new Error("Post not found");
  }

  let updatedLikeIds = [...post.likeIds];

  if (updatedLikeIds.includes(userId)) {
    updatedLikeIds = updatedLikeIds.filter((id) => id !== userId);
  } else {
    updatedLikeIds.push(userId);
  }

  const updatedPost = await prisma.post.update({
    where: {
      id: postId,
    },
    data: {
      likeIds: updatedLikeIds,
    },
  });

  return updatedPost;
};

export default AddLike;
