import getAllPost from "@/db/postController/getAllPost";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).end();
  }
  try {
    const post = await getAllPost();
    return res.status(200).json(post);
  } catch (error) {
    return res.status(500).end();
  }
}
