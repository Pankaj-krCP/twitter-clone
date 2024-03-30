import { NextApiRequest, NextApiResponse } from "next";
import createUser from "@/db/userController/createUser";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method != "POST") {
    return res.status(405).end();
  }

  try {
    const { email, username, name, password } = req.body;
    const user = await createUser({ email, username, name, password });
    return res.status(200).json(user);
  } catch (error) {
    let errorMessage = "An unknown error occurred";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return res.status(400).json({ error: errorMessage });
  }
}
