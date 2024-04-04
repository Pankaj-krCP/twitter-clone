import { useEffect } from "react";
import useNotifications from "@/hooks/useNotifications";
import useCurrentUser from "@/hooks/useCurrentUser";
import { ClipLoader } from "react-spinners";
import NotificationFeed from "./NotificationFeed";

const Notification = () => {
  const { data: currentUser, mutate: mutateCurrentUser } = useCurrentUser();
  const { data: fetchedNotifications = [], isLoading } = useNotifications(
    currentUser?.id
  );

  useEffect(() => {
    mutateCurrentUser();
  }, [mutateCurrentUser]);

  if (isLoading) {
    return (
      <div className="flex pt-60 lg:pt-0 items-center justify-center h-full">
        <ClipLoader color="lightblue" size={60} />
      </div>
    );
  }

  if (fetchedNotifications.length === 0) {
    return (
      <div className="text-neutral-600 text-center p-6 text-xl">
        No notifications
      </div>
    );
  }

  return (
    <>
      {fetchedNotifications.map((item: Record<string, any>, index: number) => (
        <div key={index}>
          <NotificationFeed body={item?.body} />
        </div>
      ))}
    </>
  );
};

export default Notification;
