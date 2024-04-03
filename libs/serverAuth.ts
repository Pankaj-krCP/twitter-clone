import { NextApiRequest, NextApiResponse } from "next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";

const serverAuth = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerSession(req, res, authOptions);
  if (!session?.user?.email) {
    throw new Error("Not signed in");
  }

  const user = session.user;
  const data = user ? JSON.parse(JSON.stringify(user)) : null;
  console.log(data);
  return { currentUser: data };
};

export default serverAuth;
