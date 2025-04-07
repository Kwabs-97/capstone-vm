"use client";
import React from "react";
import Image from "next/image";
import { Plus } from "@/assets/icons";
import Link from "next/link";
import { useRouter } from "next/navigation";
function AddChatbotCard() {
  const router = useRouter();
  const handleCreateNewChatbot = () => {
    router.push("/dashboard/new");
  };
  return (
    <div
      className="flex flex-col items-center justify-center w-[300px] h-[150px] rounded-lg gap-2.5 bg-blue-600 hover:cursor-pointer hover:bg-blue-500 duration-300"
      onClick={handleCreateNewChatbot}
    >
      <div className="rounded-full bg-blue-400 p-3 flex items-center justify-center">
        <Image src={Plus} alt="icon" />
      </div>
      <h5 className="text-white text-xl leading-7 space-x-2 space-y-2 font-bold">
        Create a new chatbot
      </h5>
    </div>
  );
}

export default AddChatbotCard;
