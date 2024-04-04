import React, { useCallback } from "react";
import { useRouter } from "next/router";
import { IconType } from "react-icons";
import { BsDot } from "react-icons/bs";
import useCurrentUser from "@/hooks/useCurrentUser";
import signInModalState from "@/store/user/signInModalState";

interface SidebarItemProps {
  label: string;
  href?: string;
  icon: IconType;
  alert?: boolean;
}

const SidebarItem: React.FC<SidebarItemProps> = ({
  label,
  href,
  icon: Icon,
  alert,
}) => {
  const { data: currentUser } = useCurrentUser();
  const signInState = signInModalState();
  const router = useRouter();
  const handleClick = useCallback(() => {
    if (!currentUser && href !== "/") {
      signInState.open();
    } else if (href) {
      router.push(href);
    }
  }, [router, href, currentUser, signInState]);
  return (
    <div onClick={handleClick} className="flex flex-row items-center ">
      <div className="relative rounded-full h12 w-12 lg:h-14 lg:w-14 flex items-center justify-center p-4 cursor-pointer hover:bg-slate-300 hover:bg-opacity-10">
        <Icon color="white" size={20}></Icon>
        {alert && (
          <BsDot size={42} className="text-sky-500 absolute top-0 right-0" />
        )}
      </div>
      <div className="text-white hidden lg:block">{label}</div>
    </div>
  );
};

export default SidebarItem;
