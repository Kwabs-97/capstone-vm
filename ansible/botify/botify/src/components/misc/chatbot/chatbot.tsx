"use client";
import React, { useState, useEffect } from "react";
import Input from "@/components/ui/input";
import { Label } from "../../ui/label";
import Textarea from "../../ui/textarea";
import { Switch } from "../../ui/switch";
import { Separator } from "../../ui/separator";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { chatbotSchema } from "@/lib/schema";
import axios from "axios";
import { ChatbotDataInterface } from "@/app/types";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

function Chatbot({ chatbotData }: { chatbotData: ChatbotDataInterface }) {
  //form-handling
  const {
    formState: { errors, isSubmitting },
    register,
    handleSubmit,
  } = useForm({
    resolver: zodResolver(chatbotSchema),
  });

  const onSubmit = async (data: ChatbotDataInterface) => {
    if (!chatbotData) {
      try {
        const res = await axios.post("/api/routes/new", data);
        console.log(res);
      } catch (error) {
        console.log("error creating new chatbot", error);
      }
    }
  };
  return (
    <>
      {!chatbotData && (
        <div className="h-screen w-screen">
          <LoadingSpinner className="" />
        </div>
      )}
      <div className="text-gray-900 gap-6 flex flex-col">
        <div>
          <div className="flex flex-row gap-2 ">
            <div className="p-4 rounded-2xl bg-gray-50 flex flex-col">
              <h4 className="font-semibold text-gray-900">Last Trained</h4>
              <p className="text-gray-700">June 16, 2023</p>
            </div>
            <div className="p-4 rounded-2xl bg-gray-50 flex flex-col">
              <h4 className="font-semibold text-gray-900">Visibility</h4>
              <p className="text-gray-700">Public</p>
            </div>
            <div className="p-4 rounded-2xl bg-gray-50 flex flex-col">
              <h4 className="font-semibold text-gray-900">Status</h4>
              <p className="text-gray-700">Live</p>
            </div>
          </div>
        </div>
        {/*Separator */}

        <Separator className="bg-gray-100" />
        <div className="">
          <form action="" className="" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-2 ">
              <Input
                name="chatbot_name"
                register={register}
                label="Chatbot Name"
                defaultValue={chatbotData?.name}
                placeholder="Enter the name of your chatbot"
              />

              <Textarea
                register={register}
                name="welcome_message"
                defaultValue={chatbotData?.welcome_message}
                label="Customize your welcome message"
                labelWithAutogenerate
                placeholder="Enter your welcome message"
              />
              <Textarea
                register={register}
                defaultValue={chatbotData?.fallback_message}
                name="fallback_message"
                label="Customize your fallback message"
                labelWithAutogenerate
                placeholder="Enter your fallback message"
              />

              <div className="flex flex-row justify-between w-full p-3 border border-gray-200 rounded-lg">
                <Label htmlFor="collectUsersEmail">Collect users email</Label>
                <Switch id="collectUsersEmail" name="collectUsersEmail" />
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Chatbot;
