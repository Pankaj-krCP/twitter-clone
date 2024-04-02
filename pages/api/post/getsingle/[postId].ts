import getAllPost from "@/db/postController/getAllPost";
import getSinglePost from "@/db/postController/getSinglePost";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).end();
  }
  try {
    const { postId } = req.query;
    const post = await getSinglePost(postId as string);
    return res.status(200).json(post);
  } catch (error) {
    return res.status(500).end();
  }
}
