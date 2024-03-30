import singleUser from "@/db/userController/singleUser";
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
    if (!userId || typeof userId !== "string") {
      throw new Error("Invalid Id");
    }
    const user = await singleUser(userId);
    return res.status(200).json(user);
  } catch (error) {
    return res.status(400).end();
  }
}
