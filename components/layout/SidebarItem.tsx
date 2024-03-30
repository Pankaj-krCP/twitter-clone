import React, { useCallback } from "react";
import { useRouter } from "next/router";
import { IconType } from "react-icons";

interface SidebarItemProps {
  label: string;
  href?: string;
  icon: IconType;
}

const SidebarItem: React.FC<SidebarItemProps> = ({
  label,
  href,
  icon: Icon,
}) => {
  const router = useRouter();
  const handleClick = useCallback(() => {
    if (href) {
      router.push(href);
    }
  }, [router, href]);
  return (
    <div onClick={handleClick} className="flex flex-row items-center">
      <div className="relative rounded-full h-14 w-14 flex items-center justify-center p-4 hover:bg-slate-300 hover:bg-opacity-10 cursor-pointer">
        <Icon color="white"></Icon>
      </div>
      <div className="text-white hidden sm:block">{label}</div>
    </div>
  );
};

export default SidebarItem;
