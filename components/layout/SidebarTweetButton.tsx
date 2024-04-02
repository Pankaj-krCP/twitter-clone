import React, { useCallback } from "react";
import { FaFeather } from "react-icons/fa";
import signInModalState from "@/store/user/signInModalState";
import useCurrentUser from "@/hooks/useCurrentUser";

const SidebarTweetButton = () => {
  const signInModal = signInModalState();
  const { data: currentUser } = useCurrentUser();

  const onClick = useCallback(() => {
    if (currentUser) {
      const element = document.getElementById("whatishappening");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
        element.focus();
      }
    } else {
      signInModal.open();
    }
  }, [currentUser, signInModal]);

  return (
    <div onClick={onClick}>
      <div
        className="
        mt-6
        sm:hidden 
        rounded-full 
        h-14
        w-14
        p-4
        flex
        items-center
        justify-center 
        bg-sky-500 
        hover:bg-opacity-80 
        transition
        cursor-pointer
      "
      >
        <FaFeather size={24} color="white" />
      </div>
      <div
        className="
        mt-6
        hidden 
        sm:block 
        px-4
        py-2
        rounded-full
        bg-sky-500
        hover:bg-opacity-90 
        cursor-pointer
      "
      >
        <p
          className="
            text-center
            font-semibold
            text-white 
            text-[20px]
        "
        >
          Tweet
        </p>
      </div>
    </div>
  );
};

export default SidebarTweetButton;
