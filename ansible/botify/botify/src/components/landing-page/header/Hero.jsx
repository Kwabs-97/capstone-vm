'use client'
import React from "react";
import Container from "../../misc/Container";
import Header1 from "../../typography/Header1";
import CustomButton from "../../form-elements/CustomButton";
import { fallbackMessage } from "@/assets/images";
import { useRouter } from "next/navigation";

export default function Hero() {
  const router = useRouter()
  function NavigateToDashboard(){
router.push("/dashboard")
  }
  return (
    <Container className="gap-20">
      <div className="flex flex-col gap-6 justify-center items-center max-w-[600px]">
        <section>
          <Header1 className="text-white">
            Build AI-Powered Chatbot in minutes
          </Header1>
        </section>
        <section>
          <p className="text-center text-gray-300 ">
            Create a personalized GPT model and utilize its capabilities to
            manage customer support, generate leads, interact with users, and
            more.
          </p>
        </section>
        <section>
          <CustomButton className="px-10" onClick={NavigateToDashboard}>
            Start building your chatbot
          </CustomButton>
        </section>
      </div>
      <div>
        <div
          className="rounded border border-gray-600 shadow-fallback"
          style={{
            backgroundImage: `url(${fallbackMessage.src})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            height: "700px",
            width: "1100px",
          }}
        ></div>
      </div>
    </Container>
  );
}
