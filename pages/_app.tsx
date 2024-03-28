import type { AppProps } from "next/app";
import "@/styles/globals.css";
import Layout from "@/components/Layout";
import Modal from "@/components/Modal";
import CustomInput from "@/components/CustomInput";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Modal
        isOpen={true}
        onClose={() => {}}
        onSubmit={() => {}}
        title="Test-Modal"
        body={<CustomInput onChange={() => {}} />}
        footer={<div className="text-white">World</div>}
        actionLabel={"Submit"}
        disabled={false}
      />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}
