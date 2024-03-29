import React, { useCallback, useState } from "react";

import signInModalState from "@/store/signInModalState";
import signUpModalState from "@/store/signUpModalState";

import CustomInput from "../common/CustomInput";
import Modal from "../common/Modal";

const SignInModal = () => {
  const signInModal = signInModalState();
  const signUpModal = signUpModalState();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onToggle = useCallback(() => {
    if (isLoading) {
      return;
    }
    signInModal.close();
    signUpModal.open();
  }, [isLoading, signUpModal, signInModal]);

  const onSubmit = useCallback(async () => {
    try {
      setIsLoading(true);
      //Sign In Logic
      signInModal.close();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, [signInModal]);

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
        New User ?
        <span
          onClick={onToggle}
          className="text-white cursor-pointer hover:underline"
        >
          {" "}
          Sign Up
        </span>
      </p>
    </div>
  );

  return (
    <div>
      <Modal
        isOpen={signInModal.isOpen}
        onClose={signInModal.close}
        onSubmit={onSubmit}
        title={"Sign In"}
        body={bodyContent}
        footer={footerContent}
        actionLabel={"Submit"}
        disabled={isLoading}
      />
    </div>
  );
};

export default SignInModal;
