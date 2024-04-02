import getUserPost from "@/db/postController/getUserPost";
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
    const post = await getUserPost(userId as string);
    return res.status(200).json(post);
  } catch (error) {
    return res.status(500).end();
  }
}
