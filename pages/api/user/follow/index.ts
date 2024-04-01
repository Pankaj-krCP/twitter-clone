import followUser from "@/db/userController/followUser";
import { NextApiRequest, NextApiResponse } from "next";

export default async function hander(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "PATCH") {
    return res.status(405).end();
  }
  try {
    const { followerId, followingId } = req.body;
    const users = await followUser(followerId, followingId);
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).end();
  }
}
