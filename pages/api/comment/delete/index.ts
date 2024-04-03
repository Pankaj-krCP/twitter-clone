import deleteComment from "@/db/commentController/deleteComment";
import serverAuth from "@/libs/serverAuth";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "DELETE") {
    return res.status(405).end();
  }
  try {
    const { commentId } = req.body;
    const { currentUser } = await serverAuth(req, res);
    const userId = currentUser?.id;
    const comment = await deleteComment(userId as string, commentId as string);
    res.status(200).json(comment);
  } catch (error) {
    return res.status(505).end();
  }
}
