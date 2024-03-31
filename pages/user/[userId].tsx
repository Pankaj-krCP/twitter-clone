import React from "react";
import { ClipLoader } from "react-spinners";
import { useRouter } from "next/router";
import Header from "@/components/common/Header";
import useUser from "@/hooks/useUser";
import Hero from "@/components/user/Hero";
import Bio from "@/components/user/Bio";

const UserProfile = () => {
  const router = useRouter();
  const { userId } = router.query;
  const { data: fetchedUser, isLoading } = useUser(userId as string);

  if (isLoading || !fetchedUser) {
    return (
      <div className="flex pt-60 lg:pt-0 items-center justify-center h-full">
        <ClipLoader color="lightblue" size={60} />
      </div>
    );
  }
  return (
    <>
      <Header label={fetchedUser?.name} showBackArrow={true} />
      <Hero userId={userId as string} />
      <Bio userId={userId as string} />
    </>
  );
};

export default UserProfile;
