import bcrypt from "bcrypt";
import prisma from "@/db/connect";

interface createUserParams {
  email: string;
  username: string;
  name: string;
  password: string;
}

export default async function createUser({
  email,
  username,
  name,
  password,
}: createUserParams) {
  const existingEmailUser = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });
  const existingUsernameUser = await prisma.user.findUnique({
    where: {
      username: username,
    },
  });

  if (existingEmailUser && existingUsernameUser) {
    throw new Error("Email and Username Already Exist");
  } else if (existingEmailUser) {
    throw new Error("Email Already Exist");
  } else if (existingUsernameUser) {
    throw new Error("Username Already Exist");
  }

  const hashedPassword = await bcrypt.hash(password, 12);
  const user = await prisma.user.create({
    data: {
      email,
      username,
      name,
      hashedPassword,
    },
  });

  return user;
}
