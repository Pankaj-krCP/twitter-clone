import useSWR from "swr";
import fetcher from "@/libs/fetcher";

const useCurrentUser = () => {
  // const { data, error, isLoading, mutate } = useSWR(
  //   "/api/user/currentuser",
  //   fetcher
  // );

  const data = "Pankaj";

  return {
    data,
  };
};

export default useCurrentUser;
