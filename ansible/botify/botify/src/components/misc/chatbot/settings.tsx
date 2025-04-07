"use client";
import React, { useState, useEffect } from "react";
import { Separator } from "@/components/ui/separator";
import Input from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { ChatbotDataInterface } from "@/app/types";
import axios from "axios";
import CustomButton from "@/components/form-elements/CustomButton";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

interface SettingsProps {
  chatbotData?: ChatbotDataInterface;
}
function Settings({ chatbotData }: SettingsProps) {
  // handling loading state
  const [isUpdating, setIsUpdating] = useState<Boolean>(false);


  //form-handling
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      color: chatbotData?.color,
      offline_fallback_notification_email:
        chatbotData?.offline_fallback_notification_email,
    },
  });

  useEffect(() => {
    if (chatbotData) {
      reset({
        color: chatbotData.color,
        offline_fallback_notification_email:
          chatbotData.offline_fallback_notification_email,
      });
    }
  }, [reset, chatbotData]);

  const updateSettings = handleSubmit(async (data: ChatbotDataInterface) => {
    setIsUpdating(true);
    const chatbotSettings = {
      ...data,
      id: chatbotData?.id,
    };
    try {
      const response = await axios.put(
        `/api/routes/chatbots/update/${chatbotData?.id}`,
        chatbotSettings
      );
      console.log(response);
      setIsUpdating(false);
    } catch (error) {
      console.log("error");
    }
  });

  return (
    <>
      <form onSubmit={updateSettings}>
        <div className="text-gray-900 gap-2 flex flex-col">
          <div className="flex flex-col">
            <div>
              <h3 className="text-gray-900 text-lg leading-8 font-bold">
                Appearance
              </h3>
            </div>
            <div className="flex flex-col gap-1">
              <h5>Chatbot Color</h5>
              <div className="flex flex-row gap-1 max-w-[536px] flex-wrap">
                <input
                  {...register?.("color")}
                  type="color"
                  className="w-24 h-[50px]"
                />
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <h5>Chatbot Icon</h5>
              <div className="flex flex-row gap-4">
                <div className="border rounded-lg border-dashed border-blue-600 py-2 flex items-center justify-center flex-1">
                  <p>None</p>
                </div>
                <div className="border rounded-lg border-dashed border-blue-600 flex flex-row py-2 flex-1 items-center justify-center">
                  <p>Upload</p>
                </div>
              </div>
            </div>
          </div>
          <Separator className="bg-gray-50" />
          <div className="flex flex-col gap-2">
            <div className="flex flex-col ">
              <h4 className="text-gray-900 text-lg leading-8 font-bold">
                Notification
              </h4>
              <div>
                <p>Send offline fallback message email notification to</p>
                <input
                  className="w-full h-11 border px-4 py-3 bg-gray-50 border-lightGray rounded-lg focus:border-2 focus:border-blue-500 focus:outline-none duration-150 transition-all"
                  placeholder="Enter email address"
                  defaultValue={
                    chatbotData &&
                    chatbotData.offline_fallback_notification_email
                  }
                  {...register?.("offline_fallback_notification_email")}
                />
              </div>
            </div>
            <div className="flex flex-row gap-4 items-center justify-start text-white">
              <CustomButton type="submit" disabled={!isUpdating}>
                {isUpdating ? <LoadingSpinner /> : "Save"}
              </CustomButton>
            </div>
          </div>
          <Separator />
          <div>
            <div className="flex flex-col">
              <h4 className="text-gray-900 text-lg leading-8 font-bold">
                Branding
              </h4>
              <div className="flex flex-row items-center gap-6">
                <p>{`Display "Powered By" badge`}</p>
              </div>
            </div>
          </div>
          <Separator className="" />
          <div>
            <div className="flex flex-col">
              <div className="flex flex-col gap-0 ">
                <h5 className="text-gray-900 text-lg leading-8 font-bold">
                  Delete chatbot
                </h5>
                <p>This action will permanently delete this chatbot</p>
              </div>
              <div className="flex flex-col gap-4">
                <p>
                  Confirm by typing
                  <span className="text-red-500"> {`"delete chatbot"`} </span>
                  below
                </p>
                <div>
                  <Input name="delete" placeholder="delete chatbot" />
                </div>
                <div className="">
                  <Button className="bg-red-500 text-white">Delete</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}

export default Settings;
