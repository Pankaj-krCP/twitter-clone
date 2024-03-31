import React from "react";
import Sidebar from "./Sidebar";
import Followbar from "./Followbar";
import { useRouter } from "next/router";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const router = useRouter();
  const { userId } = router.query;
  return (
    <div className="h-screen bg-black">
      <div className="container h-full mx-auto xl:px-30 max-w-6xl">
        <div className="grid grid-cols-4 h-full">
          <Sidebar />
          <div className="col-span-2 hidden lg:block border-x-[1px] border-neutral-800">
            {children}
          </div>
          <div
            className={`col-span-3 lg:col-span-1 border-l-[1px] border-neutral-800`}
          >
            <div className={`${userId && "hidden"} lg:block`}>
              <Followbar />
            </div>
            <div className="lg:hidden">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
