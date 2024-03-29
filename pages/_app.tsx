import type { AppProps } from "next/app";
import "@/styles/globals.css";
import Layout from "@/components/layout/Layout";
import SignInModal from "@/components/auth/SignInModal";
import SignUpModal from "@/components/auth/SignUpModal";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <SignUpModal />
      <SignInModal />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}
