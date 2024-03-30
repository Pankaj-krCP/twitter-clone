import { NextApiRequest, NextApiResponse } from "next";
import serverAuth from "@/db/userController/serverAuth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  res.status(200).json({ text: "Testing" });
  // try {
  //   const { currentUser } = await serverAuth(req);
  //   return res.status(200).json(currentUser);
  // } catch (error) {
  //   console.log(error);
  //   return res.status(400).end();
  // }
}
