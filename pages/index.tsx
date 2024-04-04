import HomeHeader from "@/components/home/HomeHeader";
import HomePostFeed from "@/components/home/HomePostFeed";
import PostCreate from "@/components/home/PostCreate";

export default function Home() {
  return (
    <>
      <HomeHeader />
      <PostCreate />
      <div className="pb-24">
        <HomePostFeed />
      </div>
    </>
  );
}
