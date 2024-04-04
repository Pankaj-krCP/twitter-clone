import prisma from "@/libs/connect";

const createComment = async (userId: string, postId: string, body: string) => {
  const post = await prisma.comment.create({
    data: {
      userId,
      postId,
      body,
    },
  });

  //------------------NOTIFICATION------------
  try {
    const post = await prisma.post.findUnique({
      where: {
        id: postId,
      },
    });

    if (post?.userId) {
      await prisma.notification.create({
        data: {
          body: `${userId} replied on your tweet!`,
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
  //----------------NOTIFICATION-----------------
  return post;
};

export default createComment;
