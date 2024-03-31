import updateUser from "@/db/userController/updateUser";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "PATCH") {
    return res.status(405).end();
  }
  try {
    const { id, name, username, bio, profileImage, coverImage } = req.body;
    if (!name || !username) {
      throw new Error("Name and Username is Needed");
    }
    const updatedUser = await updateUser({
      id,
      name,
      username,
      bio,
      profileImage,
      coverImage,
    });
    return res.status(200).json(updatedUser);
  } catch (error) {
    return res.status(500).end();
  }
}
