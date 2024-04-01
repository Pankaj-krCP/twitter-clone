import React, { useCallback, useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import editModalState from "@/store/user/editModalStae";
import useCurrentUser from "@/hooks/useCurrentUser";
import useUser from "@/hooks/useUser";
import CustomInput from "../common/CustomInput";
import Modal from "../common/Modal";
import ImageUpload from "./ImageUpload";

const EditModal = () => {
  const editModal = editModalState();
  const { data: currentUser } = useCurrentUser();
  const { data: fetchedUser, mutate: mutateFetchedUser } = useUser(
    currentUser?.id
  );

  const id = useMemo(() => {
    return currentUser?.id;
  }, [currentUser?.id]);

  const [profileImage, setProfileImage] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");

  useEffect(() => {
    setProfileImage(fetchedUser?.profileImage);
    setCoverImage(fetchedUser?.coverImage);
    setName(fetchedUser?.name);
    setUsername(fetchedUser?.username);
    setBio(fetchedUser?.bio);
  }, [fetchedUser]);

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = useCallback(async () => {
    try {
      setIsLoading(true);
      await axios.patch("/api/user/edit", {
        id,
        name,
        username,
        bio,
        profileImage,
        coverImage,
      });
      mutateFetchedUser();
      editModal.close();
      toast.success("Successfully Updted!");
    } catch (error) {
      toast.error("Something Went Wrong");
    } finally {
      setIsLoading(false);
    }
  }, [
    id,
    name,
    username,
    bio,
    profileImage,
    coverImage,
    mutateFetchedUser,
    editModal,
  ]);

  const bodyContent = (
    <div className="flex flex-col">
      <div className="flex gap-5">
        <ImageUpload
          label={"upload Cover image"}
          value={coverImage}
          disabled={isLoading}
          onChange={(image) => {
            setCoverImage(image);
          }}
        />

        <ImageUpload
          label={"upload profile image"}
          value={profileImage}
          disabled={isLoading}
          onChange={(image) => {
            setProfileImage(image);
          }}
        />
      </div>

      <div>
        <p className="text-xl text-neutral-500 mb-2">name</p>
        <CustomInput
          type="text"
          disabled={isLoading}
          placehoder="name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
      </div>
      <div>
        <p className="text-xl text-neutral-500 mb-2">username</p>
        <CustomInput
          type="text"
          disabled={isLoading}
          placehoder="username"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
      </div>
      <div>
        <p className="text-xl text-neutral-500 mb-2">bio</p>
        <CustomInput
          type="text"
          disabled={isLoading}
          placehoder="bio"
          value={bio || ""}
          onChange={(e) => {
            setBio(e.target.value);
          }}
        />
      </div>
    </div>
  );

  const footerContent = {};
  if (editModal.isOpen) {
    return (
      <div>
        <Modal
          isOpen={editModal.isOpen}
          onClose={editModal.close}
          onSubmit={onSubmit}
          title={"Update Profile"}
          body={bodyContent}
          // footer={<div>Hi</div>}
          actionLabel={"Save"}
          disabled={isLoading}
        />
      </div>
    );
  }
  return <div>EditModal</div>;
};

export default EditModal;
