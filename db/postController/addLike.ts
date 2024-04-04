import prisma from "@/libs/connect";

const addLike = async (postId: string, userId: string) => {
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

    //-----------NOTIFICATION-------------------
    try {
      const post = await prisma.post.findUnique({
        where: {
          id: postId,
        },
      });

      if (post?.userId) {
        await prisma.notification.create({
          data: {
            body: `${userId} liked your tweet!`,
            userId: post.userId,
          },
        });

        await prisma.user.update({
          where: {
            id: post.userId,
          },
          data: {
            hasNotification: true,
          },
        });
      }
    } catch (error) {
      throw new Error(error as any);
    }
    // --------------NOTIFICATION----------------
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

export default addLike;
