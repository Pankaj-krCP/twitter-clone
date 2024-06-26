import { NextApiRequest, NextApiResponse } from "next";
import serverAuth from "@/libs/serverAuth";
import createComment from "@/db/commentController/createComment";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }
  try {
    const { currentUser } = await serverAuth(req, res);
    const { userId, postId, body } = req.body;
    if (currentUser?.id !== userId) {
      throw new Error("Not Authinticated");
    }
    const comment = await createComment(userId, postId, body);
    return res.status(200).json(comment);
  } catch (error) {
    return res.status(500).end();
  }
}
