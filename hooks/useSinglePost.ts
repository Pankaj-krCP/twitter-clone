import fetcher from "@/libs/fetcher";
import useSWR from "swr";

const useSinglePost = (postId: string) => {
  const url = postId ? `/api/post/getsingle/${postId}` : null;
  const { data, error, isLoading, mutate } = useSWR(url, fetcher);
  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export default useSinglePost;
