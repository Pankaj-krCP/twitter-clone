import { NextApiRequest, NextApiResponse } from "next";
import createPost from "@/db/postController/createPost";
import serverAuth from "@/libs/serverAuth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }
  try {
    const { currentUser } = await serverAuth(req, res);
    const { userId, body } = req.body;
    if (currentUser?.id !== userId) {
      throw new Error("Not Authinticated");
    }
    const post = await createPost(userId, body);
    return res.status(200).json(post);
  } catch (error) {
    return res.status(500).end();
  }
}
