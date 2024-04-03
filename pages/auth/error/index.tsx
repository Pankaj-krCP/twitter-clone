import { useRouter } from "next/router";
import { useEffect } from "react";

const errors = {
  Signin: "Try signing with a different account.",
  OAuthSignin: "Try signing with a different account.",
  OAuthCallback: "Try signing with a different account.",
  OAuthCreateAccount: "Try signing with a different account.",
  EmailCreateAccount: "Try signing with a different account.",
  Callback: "Try signing with a different account.",
  OAuthAccountNotLinked:
    "To confirm your identity, sign in with the same account you used originally.",
  EmailSignin: "Check your email address.",
  CredentialsSignin:
    "Sign in failed. Check the details you provided are correct.",
  default: "Unable to sign in.",
};

const Error = () => {
  const router = useRouter();
  const { error } = router.query;

  const errorMessage =
    error && (errors[error as keyof typeof errors] ?? errors.default);

  useEffect(() => {
    setTimeout(() => {
      router.push("/");
    }, 3000);
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="text-center">
        <h1 className="text-white text-3xl font-bold mb-4">
          Oops! Something went wrong
        </h1>
        <h2 className="text-white text-xl">{errorMessage}</h2>
      </div>
    </div>
  );
};

export default Error;
