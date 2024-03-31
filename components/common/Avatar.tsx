import Image from "next/image";
import { useRouter } from "next/router";
import { useCallback } from "react";
import { HiUserCircle } from "react-icons/hi";
import useUser from "@/hooks/useUser";

interface AvatarProps {
  userId: string;
  isLarge?: boolean;
  hasBorder?: boolean;
}

const Avatar: React.FC<AvatarProps> = ({ userId, isLarge, hasBorder }) => {
  const router = useRouter();

  const { data: fetchedUser } = useUser(userId);

  const onClick = useCallback(
    (event: any) => {
      event.stopPropagation();
      const url = `/user/${userId}`;
      router.push(url);
    },
    [router, userId]
  );

  return (
    <div
      onClick={onClick}
      className={`
        ${hasBorder ? "border-4 border-white" : ""}
        ${isLarge ? "h-32" : "h-12"}
        ${isLarge ? "w-32" : "w-12"}
        rounded-full 
        hover:opacity-90 
        transition 
        cursor-pointer
        relative
      `}
    >
      {fetchedUser?.profileImage ? (
        <Image
          fill
          style={{
            objectFit: "cover",
            borderRadius: "100%",
          }}
          alt="Avatar"
          src={fetchedUser?.profileImage}
        />
      ) : (
        <HiUserCircle
          color="white"
          className={`
          ${isLarge ? "h-32" : "h-12"}
          ${isLarge ? "w-32" : "w-12"}`}
          onClick={onClick}
        />
      )}
    </div>
  );
};

export default Avatar;
