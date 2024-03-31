import useUsers from "@/hooks/useUsers";
import Avatar from "../common/Avatar";
import React from "react";

const FollowBar = () => {
  const { data: users = [] } = useUsers();
  console.log(users);
  if (users.length === 0) {
    return null;
  }

  return (
    <div
      className={`px-2 lg:px-6 py-2 lg:py-4 border-b-[1px] lg:border-b-[0px] border-neutral-800`}
    >
      <div className="lg:bg-neutral-800 rounded-xl p-4">
        <h2 className="hidden lg:block text-white text-xl font-semibold">
          Who to follow
        </h2>
        <div
          className={`flex lg:flex-col gap-3 lg:gap-6 lg:mt-4 pb-1 lg:pb-0 overflow-x-auto`}
        >
          {users.map((user: Record<string, any>) => (
            <div
              key={user.id}
              className="bg-neutral-900 lg:bg-transparent flex flex-col lg:flex-row gap-4 p-3 py-1 lg:p-0 items-center justify-center lg:justify-start rounded-md"
            >
              <Avatar userId={user.id} />
              <div className="flex flex-col items-center lg:items-start">
                <p className="text-white font-semibold text-sm">{user.name}</p>
                <p className="text-neutral-400 text-sm">@{user.username}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FollowBar;
