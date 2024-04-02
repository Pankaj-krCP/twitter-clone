import fetcher from "@/libs/fetcher";
import useSWR from "swr";

const useAllPost = () => {
  const { data, error, isLoading, mutate } = useSWR(
    "/api/post/getall/",
    fetcher
  );

  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export default useAllPost;
