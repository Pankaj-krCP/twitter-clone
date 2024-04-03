import fetcher from "@/libs/fetcher";
import useSWR from "swr";

const useSinglePost = (postId: string) => {
  const { data, error, isLoading, mutate } = useSWR(
    `/api/post/getsingle/${postId}`,
    fetcher
  );

  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export default useSinglePost;
