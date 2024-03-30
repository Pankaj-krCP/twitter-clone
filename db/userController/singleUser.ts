import prisma from "@/db/connect";

export default async function singleUser(userId: string) {
  const user = await prisma.user.findUnique({
    select: {
      id: true,
      name: true,
      username: true,
      bio: true,
      image: true,
      profileImage: true,
      createdAt: true,
      followingIds: true,
      posts: true,
    },
    where: {
      id: userId,
    },
  });

  if (!user) {
    throw new Error("User Not Found");
  }

  const followers = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      username: true,
      profileImage: true,
    },
    where: {
      followingIds: {
        has: userId,
      },
    },
  });

  return { ...user, followers };
}
