import prisma from "@/libs/connect";

export default async function allUser() {
  const allUser = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      username: true,
      profileImage: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return allUser;
}
