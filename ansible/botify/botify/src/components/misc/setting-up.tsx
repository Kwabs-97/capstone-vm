import React from "react";
import { Separator } from "../ui/separator";
import Skeleton from "../ui/skeleton";

function SettingUpChatbot() {
  return (
    <div className="py-8 px-12  gap-6">
      <Separator />
      <div className=" flex items-center justify-center w-full h-full">
        <div className="flex flex-col gap-4">
          <Skeleton />
          <div>
            <h5 className="h4">We are setting up your chatbot...</h5>
            <p className="regular">Please wait, this may take a few seconds</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SettingUpChatbot;
