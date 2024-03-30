import useSWR from "swr";
import fetcher from "@/libs/fetcher";

const useUsers = () => {
  const { data, error, isLoading, mutate } = useSWR(
    "/api/user/alluser",
    fetcher
  );

  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export default useUsers;
