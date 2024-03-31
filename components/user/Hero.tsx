import useUser from "@/hooks/useUser";
import Image from "next/image";
import React from "react";
import Avatar from "../common/Avatar";

interface HeroProps {
  userId: string;
}

const Hero: React.FC<HeroProps> = ({ userId }) => {
  const { data: fetchedUser } = useUser(userId);
  return (
    <div>
      <div className="bg-neutral-700 h-44 relative">
        {fetchedUser?.coverImage && (
          <Image
            src={fetchedUser?.coverImage}
            alt="Cover Image"
            fill
            style={{ objectFit: "cover" }}
          />
        )}
        <div className="absolute -bottom-16 left-4">
          <Avatar userId={userId} isLarge />
        </div>
      </div>
    </div>
  );
};

export default Hero;
