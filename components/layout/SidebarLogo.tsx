import React from "react";
import { useRouter } from "next/router";
import { BsTwitter } from "react-icons/bs";

const SidebarLogo = () => {
  const router = useRouter();
  return (
    <div className="rounded-full h-14 w-14 text-center p-4 hover:bg-blue-300 hover:bg-opacity-10 cursor-pointer transition">
      <BsTwitter size={28} color="white" />
    </div>
  );
};

export default SidebarLogo;
