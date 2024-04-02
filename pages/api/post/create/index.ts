import { NextApiRequest, NextApiResponse } from "next";
import createPost from "@/db/postController/createPost";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }
  try {
    const { userId, body } = req.body;
    const post = await createPost(userId, body);
    return res.status(200).json(post);
  } catch (error) {
    console.log(error);
    return res.status(500).end();
  }
}
