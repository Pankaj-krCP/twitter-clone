import deletePost from "@/db/postController/deletePost";
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
    const { postId } = req.body;
    const { currentUser } = await serverAuth(req, res);
    const userId = currentUser?.id;
    const post = await deletePost(userId as string, postId as string);
    res.status(200).json(post);
  } catch (error) {
    return res.status(505).end();
  }
}
