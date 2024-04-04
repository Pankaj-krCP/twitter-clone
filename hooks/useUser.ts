import useSWR from "swr";
import fetcher from "@/libs/fetcher";

const useUser = (userId: string) => {
  const url = userId ? `/api/user/singleuser/${userId}` : null;
  const { data, error, isLoading, mutate } = useSWR(url, fetcher);

  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export default useUser;
