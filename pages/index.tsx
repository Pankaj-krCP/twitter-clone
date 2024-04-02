import Form from "@/components/common/Form";
import Header from "@/components/common/Header";

export default function Home() {
  return (
    <>
      <Header showBackArrow={true} label={"Home"} />
      <Form placeholder={"What is happening..."} />
    </>
  );
}
