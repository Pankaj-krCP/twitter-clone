import followUser from "@/db/userController/followUser";
import serverAuth from "@/libs/serverAuth";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "PATCH") {
    return res.status(405).end();
  }
  try {
    const { currentUser } = await serverAuth(req, res);
    const { followerId, followingId } = req.body;
    if (currentUser?.id !== followerId) {
      throw new Error("Not Authinticated");
    }
    const users = await followUser(followerId, followingId);
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).end();
  }
}
