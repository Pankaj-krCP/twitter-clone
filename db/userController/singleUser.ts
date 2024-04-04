import prisma from "@/libs/connect";

export default async function singleUser(userId: string) {
  const user = await prisma.user.findUnique({
    select: {
      id: true,
      name: true,
      username: true,
      bio: true,
      image: true,
      coverImage: true,
      profileImage: true,
      createdAt: true,
      followingIds: true,
      followersIds: true,
      posts: true,
      hasNotification: true,
    },
    where: {
      id: userId,
    },
  });

  if (!user) {
    throw new Error("User Not Found");
  }

  return user;
}
