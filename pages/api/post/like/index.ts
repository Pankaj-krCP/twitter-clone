import { NextApiRequest, NextApiResponse } from "next";
import serverAuth from "@/libs/serverAuth";
import AddLike from "@/db/postController/AddLike";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "PATCH") {
    return res.status(405).end();
  }
  try {
    const { currentUser } = await serverAuth(req, res);
    const { postId, userId } = req.body;
    if (!currentUser) {
      throw new Error("Not Authinticated");
    }
    const post = await AddLike(postId as string, userId as string);
    return res.status(200).json(post);
  } catch (error) {
    return res.status(500).end();
  }
}
