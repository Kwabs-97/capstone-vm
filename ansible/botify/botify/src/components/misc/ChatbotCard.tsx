import React from "react";
import { Ellipsis } from "lucide-react";
import Skeleton from "../ui/skeleton";

const ChatbotCard = ({
  children,
  handleNavigation,
}: {
  children: React.ReactNode;
  handleNavigation: () => void;
}) => {
  return (
    <div
      className="w-[300px] h-[200px] border rounded-lg flex flex-col border-gray-200 bg-white gap-1 hover:cursor-pointer"
      onClick={handleNavigation}
    >
      <div className="self-end px-2.5 py-3">{<Ellipsis color="#6B7280" />}</div>
      <div className="flex flex-col">
        <div className="px-6">
          <h3 className="text-black font-bold text-xl">
            {children || "Chatbot One"}
          </h3>
        </div>
        <Skeleton />
      </div>
    </div>
  );
};

export default ChatbotCard;
