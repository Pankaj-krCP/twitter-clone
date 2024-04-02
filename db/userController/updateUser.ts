import prisma from "@/libs/connect";

interface updatedUser {
  id: string;
  name: string;
  username: string;
  bio: string;
  profileImage: string;
  coverImage: string;
}

const updatedUser = async ({
  id,
  name,
  username,
  bio,
  profileImage,
  coverImage,
}: updatedUser) => {
  const updatedUser = await prisma.user.update({
    where: {
      id: id,
    },
    data: {
      name: name,
      username: username,
      bio: bio,
      profileImage: profileImage,
      coverImage: coverImage,
    },
  });
  return updatedUser;
};

export default updatedUser;
