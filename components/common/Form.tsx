import React, { useCallback, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import useAllPost from "@/hooks/useAllPost";
import useCurrentUser from "@/hooks/useCurrentUser";
import useSinglePost from "@/hooks/useSinglePost";
import signInModalState from "@/store/user/signInModalState";
import signUpModalState from "@/store/user/signUpModalState";
import Button from "./Button";
import Avatar from "./Avatar";
import { FaFeather } from "react-icons/fa";

interface FormProps {
  placeholder: string;
  isComment?: boolean;
  postId?: string;
}

const Form: React.FC<FormProps> = ({ placeholder, isComment, postId }) => {
  const signUpState = signUpModalState();
  const signInState = signInModalState();

  const { data: currentUser } = useCurrentUser();
  const { mutate: mutateSinglePost } = useSinglePost(postId as string);
  const { mutate: mutatePosts } = useAllPost();

  const [body, setBody] = useState("");
  const [isLoading, setisLoading] = useState(false);

  const onSubmit = useCallback(async () => {
    try {
      setisLoading(false);

      if (!isComment) {
        await axios.post("/api/post/create", { userId: currentUser?.id, body });
        toast.success("Tweet Created!");
        setBody("");
        mutatePosts();
      } else {
        await axios.post("/api/comment/create", {
          body,
          userId: currentUser?.id,
          postId,
        });
        toast.success("Comment Added!");
        setBody("");
        mutateSinglePost();
      }
    } catch (error) {
      toast.error("Something Went Wrong!");
    } finally {
      setisLoading(false);
    }
  }, [
    body,
    currentUser,
    postId,
    isComment,
    setisLoading,
    mutatePosts,
    mutateSinglePost,
  ]);

  return (
    <div className="border-b-[1px] border-neutral-800 px-5 py-2">
      {currentUser ? (
        <div className="flex flex-row gap-4">
          <div>
            <Avatar userId={currentUser?.id} />
          </div>
          <div className="w-full">
            <textarea
              id="whatishappening"
              disabled={isLoading}
              onChange={(event) => setBody(event.target.value)}
              value={body}
              className="
                disabled:opacity-80
                peer
                resize-none 
                mt-3 
                w-full 
                bg-black 
                ring-0 
                outline-none 
                text-[20px] 
                placeholder-neutral-500 
                text-white
              "
              placeholder={placeholder}
            ></textarea>
            <hr
              className="
                opacity-0 
                peer-focus:opacity-100 
                h-[1px] 
                w-full 
                border-neutral-800 
                transition"
            />
            <div className="mt-4 flex flex-row justify-end">
              <Button
                disabled={isLoading || !body}
                onClick={onSubmit}
                label="➤"
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="py-8">
          <h1 className="text-white text-2xl text-center mb-4 font-bold">
            Welcome to Twitter
          </h1>
          <div className="flex flex-row items-center justify-center gap-4">
            <Button label="Login" onClick={signInState.open} />
            <Button label="Register" onClick={signUpState.open} secondary />
          </div>
        </div>
      )}
    </div>
  );
};

export default Form;
