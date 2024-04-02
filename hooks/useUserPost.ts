import useSWR from "swr";
import fetcher from "@/libs/fetcher";

const useUserPost = (userId: string) => {
  const { data, error, isLoading, mutate } = useSWR(
    `/api/user/post/${userId}`,
    fetcher
  );

  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export default useUserPost;
