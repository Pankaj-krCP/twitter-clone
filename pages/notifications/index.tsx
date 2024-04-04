import Header from "@/components/common/Header";
import Notification from "@/components/notifications/Notification";
import React from "react";

const index = () => {
  return (
    <>
      <Header showBackArrow={true} label={"Notifications"} />
      <Notification />
    </>
  );
};

export default index;
