import HomeHeader from "@/components/home/HomeHeader";
import HomePostFeed from "@/components/home/HomePostFeed";
import PostCreate from "@/components/home/PostCreate";

export default function Home() {
  return (
    <>
      <HomeHeader />
      <PostCreate />
      <HomePostFeed />
    </>
  );
}
