"use client";
import { Avatar } from "@/assets/icons";
import CustomButton from "@/components/form-elements/CustomButton";
import { Search, Plus } from "@/assets/icons";
import AddChatbotCard from "@/components/misc/AddChatbotCard";
import QueryContainer from "@/components/misc/QueryContainer";
import Image from "next/image";
import { AIAssitant } from "@/assets/icons";
import { useEffect, useState } from "react";
import Link from "next/link";
import Input from "@/components/ui/input";
import axios from "axios";
import ChatbotCard from "@/components/misc/ChatbotCard";
import { useRouter } from "next/navigation";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

function Page({ params }) {
  const [isLoading, setIsLoading] = useState(false);
  const [chatbots, setChatbots] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchChatBots = async () => {
      try {
        setIsLoading(true);
        const res = await axios.get("api/routes/chatbots");
        console.log(res.data.chatbots);
        setChatbots(res.data.chatbots);
      } catch (error) {
        console.error("Failed to fetch chatbots:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchChatBots();
  }, []);

  const handleNavigation = (id) => {
    router.push(`dashboard/${id}`);
  };

  const handleAddChatbot = () => {
    router.push("/dashboard/new");
  };

  return (
    <div className="flex flex-col gap-6 w-full min-h-screen bg-gray-50 overflow-hidden">
      <div className="header py-8 px-12 border-b border-b-gray-200">
        <div className="flex flex-row justify-between items-center">
          <div className="flex flex-col gap-1">
            <h3 className="text-gray-900 text-2xl leading-8 font-bold">
              Chatbots
            </h3>
            <p className="text-gray-600">Train your chatbot with data</p>
          </div>
          <div className="avatar">
            <Avatar />
          </div>
        </div>
      </div>
      <div className="flex-grow px-12">
        <div className="flex flex-col gap-6 h-full">
          {/* Search box */}
          <div className="search flex flex-row justify-between">
            <Input type="search" placeholder="Search..." iconSrc={Search} />
            <CustomButton onClick={handleAddChatbot} iconSrc={Plus}>
              Add Chatbot
            </CustomButton>
          </div>

          {/* Conditional rendering */}
          {isLoading ? (
            <div className="flex flex-row items-center justify-center w-full h-full">
              <p className="text-gray-900">Loading chatbots...</p>
              <LoadingSpinner className="text-gray-500" />
            </div>
          ) : chatbots.length > 0 ? (
            <div className="flex flex-row gap-4 flex-wrap h-full">
              {
                // Display chatbots if available
                chatbots.map((chatbot) => (
                  <ChatbotCard
                    key={chatbot.id}
                    handleNavigation={() => handleNavigation(chatbot.id)}
                  >
                    {chatbot.name}
                  </ChatbotCard>
                ))
              }
            </div>
          ) : (
            <AddChatbotCard />
          )}
        </div>
      </div>
    </div>
  );
}

export default Page;
