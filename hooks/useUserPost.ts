import useSWR from "swr";
import fetcher from "@/libs/fetcher";

const useUserPost = (userId: string) => {
  const url = userId ? `/api/user/post/${userId}` : null;
  const { data, error, isLoading, mutate } = useSWR(url, fetcher);

  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export default useUserPost;
