import React, { useCallback, useState } from "react";

import signInModalState from "@/store/signInModalState";
import signUpModalState from "@/store/signUpModalState";

import CustomInput from "../common/CustomInput";
import Modal from "../common/Modal";

const SignUpModal = () => {
  const signInModal = signInModalState();
  const signUpModal = signUpModalState();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onToggle = useCallback(() => {
    if (isLoading) {
      return;
    }
    signUpModal.close();
    signInModal.open();
  }, [isLoading, signUpModal, signInModal]);

  const onSubmit = useCallback(async () => {
    try {
      setIsLoading(true);
      //Sign In Logic
      signUpModal.close();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, [signUpModal]);

  const bodyContent = (
    <div className="flex flex-col gap-2">
      <CustomInput
        placehoder={"Email"}
        type={"email"}
        value={email}
        disabled={isLoading}
        onChange={(e) => setEmail(e.target.value)}
      />
      <CustomInput
        placehoder={"Name"}
        type={"text"}
        value={name}
        disabled={isLoading}
        onChange={(e) => setName(e.target.value)}
      />
      <CustomInput
        placehoder={"Username"}
        type={"text"}
        value={username}
        disabled={isLoading}
        onChange={(e) => setUsername(e.target.value)}
      />
      <CustomInput
        placehoder={"Password"}
        type={"password"}
        value={password}
        disabled={isLoading}
        onChange={(e) => setPassword(e.target.value)}
      />
    </div>
  );

  const footerContent = (
    <div className="text-neutral-400 text-center mt-4">
      <p>
        Existing User ?{" "}
        <span
          onClick={onToggle}
          className="text-white cursor-pointer hover:underline"
        >
          {" "}
          Sign in
        </span>
      </p>
    </div>
  );

  return (
    <div>
      <Modal
        isOpen={signUpModal.isOpen}
        onClose={signUpModal.close}
        onSubmit={onSubmit}
        title={"Sign Up"}
        body={bodyContent}
        footer={footerContent}
        actionLabel={"Submit"}
        disabled={isLoading}
      />
    </div>
  );
};

export default SignUpModal;
