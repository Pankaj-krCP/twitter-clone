import React from "react";
import { signOut } from "next-auth/react";
import { BsBellFill, BsHouseFill } from "react-icons/bs";
import { FaUser } from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";
import SidebarLogo from "./SidebarLogo";
import SidebarItem from "./SidebarItem";
import SidebarLogout from "./SidebarLogout";
import SidebarTweetButton from "./SidebarTweetButton";
import useCurrentUser from "@/hooks/useCurrentUser";
import useUser from "@/hooks/useUser";

const Sidebar = () => {
  const { data: currentUser } = useCurrentUser();
  const { data: thisUser } = useUser(currentUser?.id);
  const items = [
    {
      label: "Home",
      href: "/",
      icon: BsHouseFill,
    },
    {
      label: "Notification",
      href: "/notifications",
      icon: BsBellFill,
      alert: thisUser?.hasNotification,
    },
    {
      label: "Profile",
      href: `/user/${currentUser?.id}`,
      icon: FaUser,
    },
  ];
  return (
    <div className="col-span-1 h-full px-2 sm:pr-6">
      <div className="flex flex-col lg:place-items-end">
        <div className="flex items-center justify-around lg:block space-y-2 lg:w-[230px]s">
          <div className="hidden lg:block">
            <SidebarLogo />
          </div>
          {items.map((item, index) => (
            <div key={index} className="inline-block lg:block">
              <SidebarItem
                href={item.href}
                label={item.label}
                icon={item.icon}
                alert={item?.alert}
              />
            </div>
          ))}
          {currentUser && (
            <div className="inline-block lg:block">
              <SidebarLogout
                onClick={() => {
                  signOut();
                }}
                icon={BiLogOut}
              />
            </div>
          )}
          <div className="inline-block lg:block pb-5">
            <SidebarTweetButton />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
