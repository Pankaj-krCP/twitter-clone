import userNotifictation from "@/db/notificationController/userNotification";
import serverAuth from "@/libs/serverAuth";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).end();
  }

  try {
    const { userId } = req.query;
    const { currentUser } = await serverAuth(req, res);
    if (currentUser?.id !== userId) {
      throw new Error("Not Authenticated");
    }

    const notifications = await userNotifictation(userId as string);
    return res.status(200).json(notifications);
  } catch (error) {
    return res.status(500).end();
  }
}
