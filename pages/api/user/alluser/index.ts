import allUser from "@/db/userController/allUser";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).end();
  }

  try {
    const alluser = await allUser();
    return res.status(200).json(alluser);
  } catch (error) {
    return res.status(400).end();
  }
}
