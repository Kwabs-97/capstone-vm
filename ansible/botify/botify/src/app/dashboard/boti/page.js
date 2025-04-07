import React from "react";
import { X, ArrowLeft } from "lucide-react";
import { AIAssitant } from "@/assets/icons";
import Image from "next/image";
import Link from "next/link";
import QueryContainer from "@/components/misc/QueryContainer";

function page() {
  return (
    <div>
      <div className="header py-8 px-12 border-b border-b-gray-200">
        <div className="flex flex-row justify-between items-center ">
          <Link
            className="flex flex-row  items-center gap-4 hover:cursor-pointer duration-300"
            href="/dashboard"
          >
            <div>
              <ArrowLeft color="#111827" />
            </div>
            <div className="flex flex-row gap-2.5 items-center">
              <Image src={AIAssitant} alt="icon" />
              <p className="font-bold text-darkGray text-2xl">Boti</p>
            </div>
          </Link>
          <div className="avatar">
            <X color="#111827" />
          </div>
        </div>
      </div>

      <div className="main flex flex-col justify-between  ">
        <div className="chat-bubble">
          <QueryContainer className="w-max">
            👋 Hello, I am Boti. Ask me anything about Botify
          </QueryContainer>
          <div className="flex flex-row">
            <Image src={AIAssitant} alt="icon" />

            <QueryContainer>
              I will assist you create a chatbot like me
            </QueryContainer>
          </div>
        </div>
        <div></div>
      </div>
    </div>
  );
}

export default page;
