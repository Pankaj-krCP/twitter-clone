import prisma from "@/libs/connect";

const followUser = async (followerId: string, followingId: string) => {
  const alreadyFollowed = await prisma.user.findUnique({
    where: {
      id: followerId,
    },
    select: {
      followingIds: true,
    },
  });

  //---------------Unfollow-------------------------------
  if (alreadyFollowed?.followingIds.includes(followingId)) {
    const follower = await prisma.user.update({
      where: {
        id: followerId,
      },
      data: {
        followingIds: {
          set: alreadyFollowed.followingIds.filter(
            (id: string) => id !== followingId
          ),
        },
      },
    });

    const secondUser = await prisma.user.findUnique({
      select: {
        followersIds: true,
      },
      where: {
        id: followingId,
      },
    });

    const following = await prisma.user.update({
      where: {
        id: followingId,
      },
      data: {
        followersIds: {
          set: secondUser?.followersIds.filter(
            (id: string) => id !== followerId
          ),
        },
      },
    });

    return { follower, following };
  }
  //----------------------unfollow-----------------------------

  const follower = await prisma.user.update({
    where: {
      id: followerId,
    },
    data: {
      followingIds: {
        push: followingId,
      },
    },
  });

  const following = await prisma.user.update({
    where: {
      id: followingId,
    },
    data: {
      followersIds: {
        push: followerId,
      },
    },
  });

  //------------------NOTIFICATION------------
  try {
    await prisma.notification.create({
      data: {
        body: `${followerId} started followed you!`,
        userId: followingId,
      },
    });

    await prisma.user.update({
      where: {
        id: followingId,
      },
      data: {
        hasNotification: true,
      },
    });
  } catch (error) {
    throw new Error(error as any);
  }
  //----------------NOTIFICATION-----------------

  return { follower, following };
};

export default followUser;
