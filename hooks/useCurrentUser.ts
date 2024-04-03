import { useSession } from "next-auth/react";

const useCurrentUser = () => {
  const session = useSession();
  const user = session.data?.user;
  const data = user ? JSON.parse(JSON.stringify(user)) : null;
  return { data };
};

export default useCurrentUser;
