import Image from "next/image";
import { useRouter } from "next/router";
import { useCallback } from "react";
import { CgProfile } from "react-icons/cg";
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
      const url = `/api/user/singleuser/${userId}`;
      console.log(url);
      router.push(url);
    },
    [router, userId]
  );

  return (
    <div
      onClick={onClick}
      className={`
        ${hasBorder ? "border-4 border-black" : ""}
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
        <CgProfile color="white" size={44} />
      )}
    </div>
  );
};

export default Avatar;
