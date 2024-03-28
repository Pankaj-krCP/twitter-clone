import type { AppProps } from "next/app";
import "@/styles/globals.css";
import Layout from "@/components/Layout";
import SignInModal from "@/components/modals/SignInModal";
import SignUpModal from "@/components/modals/SignUpModal";

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
