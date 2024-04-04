import prisma from "@/libs/connect";

const userNotifictation = async (userId: string) => {
  const notifications = await prisma.notification.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      hasNotification: false,
    },
  });

  return notifications;
};

export default userNotifictation;
