// import { useSession } from "next-auth/react";

// const useCurrentUser = () => {
//   const session = useSession();
//   const user = session.data?.user;
//   const data = user ? JSON.parse(JSON.stringify(user)) : null;
//   return { data };
// };

// export default useCurrentUser;

import useSWR from "swr";
import fetcher from "@/libs/fetcher";

const useCurrentUser = () => {
  const { data, error, isLoading, mutate } = useSWR("/api/current", fetcher);
  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export default useCurrentUser;
