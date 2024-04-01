import prisma from "@/db/connect";

const followUser = async (followerId: string, followingId: string) => {
  const alreadyFollowed = await prisma.user.findUnique({
    where: {
      id: followerId,
    },
    select: {
      followingIds: true,
    },
  });

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
      where: {
        id: followingId,
      },
      select: {
        followersIds: true,
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

  return { follower, following };
};

export default followUser;
