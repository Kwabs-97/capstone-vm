"use client";
import React, { useState, useEffect, FormEvent } from "react";
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";
import { Separator } from "../ui/separator";
import Input from "../misc/forminput/input";
import Textarea from "../misc/forminput/textarea";
import { ChatbotDataInterface } from "@/app/types";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { useForm } from "react-hook-form";
import CustomButton from "../form-elements/CustomButton";
import axios from "axios";
import GenerateWithAI from "../misc/forminput/generateWithAI";

// interface for the chatbot data
interface DetailsProps {
  chatbotData?: ChatbotDataInterface;
  
}

// Interface for API error
interface APIError {
  response: {
    data: {
      message: string;
    };
  };
}


function Chatbot({ chatbotData }: DetailsProps) {
  // handling loading state
  const [isUpdating, setIsUpdating] = useState<Boolean>(false);
  const [error, setError] = useState<string>("");
  const [errorFallback, setErrorFallback] = useState<string>("");

  //form-handling
  const { register, handleSubmit, reset, watch, setValue } =
    useForm<ChatbotDataInterface>({
      defaultValues: {
        name: chatbotData && chatbotData?.name,
        welcome_message: chatbotData?.welcome_message,
        fallback_message: chatbotData?.fallback_message,
      },
    });

  useEffect(() => {
    if (chatbotData) {
      reset({
        name: chatbotData.name,
        welcome_message: chatbotData.welcome_message,
        fallback_message: chatbotData.fallback_message,
      });
    }
  }, [reset, chatbotData]);

  const updateDetails = handleSubmit(async (data: ChatbotDataInterface) => {
    setIsUpdating(true);
    const chatbotDetails = {
      ...data,
      id: chatbotData?.id,
    };
    try {
      const response = await axios.put(
        `/api/routes/chatbots/update/${chatbotData?.id}`,
        chatbotDetails
      );
      console.log(response);
      setIsUpdating(false);
    } catch (error) {
      console.log("error");
    }
  });



  // handle genereateWithBoti state
  const [isGenerating, setIsGenerating] = useState<Boolean>(false);
  const [isGeneratingfallback, setIsGeneratingFallback] = useState<Boolean>(false);
  // const welcome_message = watch("welcome_message");
  // const fallback_message = watch("fallback_message");
 
  const name = watch("name")

  async function handleGenerateWithAI() {
    try {
      setIsGenerating(true);
      const response = await axios.post(
        "/api/routes/genWelcomeMessage", name
        
      );
      console.log(response)
      if(response.status === 200){
        const generatedMessage = response.data.welcomeMessage.slice(1,-1)
        setValue("welcome_message", generatedMessage);
        setIsGenerating(false)
      }
    } catch (error) {
      if (error && typeof error === "object" && "response" in error){
        const apiError = error as APIError;
        setIsGeneratingFallback(false)
        setError(apiError.response.data.message)
      }
    }
  }


  async function handleGenerateFallbackMessageWithAI() {
    setIsGeneratingFallback(true);
    try {
      const response = await axios.post(
        "/api/routes/genFallbackMessage", name
        
      );
      const generatedMessage = response.data.fallbackMessage.slice(1,-1)
      setValue("fallback_message", generatedMessage);
      setIsGeneratingFallback(false)
    } catch (error:unknown) {
      if (error && typeof error === "object" && "response" in error){
      const apiError = error as APIError;
      setIsGeneratingFallback(false)
      setErrorFallback(apiError.response.data.message)
      }
      console.log(error);
    }
  }



  return (
    <>
      {!chatbotData && (
        <div className="h-screen w-screen">
          <LoadingSpinner />
        </div>
      )}

      <div className="text-gray-900 gap-6 flex flex-col w-[600px]">
        <div className="flex flex-row gap-8">
          <div className="p-4 rounded-2xl bg-gray-50 flex flex-col min-w-40 ">
            <h4 className="font-semibold text-gray-900">Last Trained</h4>
            <p className="text-gray-700">June 16, 2023</p>
          </div>
          <div className="p-4 rounded-2xl bg-gray-50 flex flex-col min-w-40 ">
            <h4 className="font-semibold text-gray-900">Visibility</h4>
            <p className="text-gray-700">Public</p>
          </div>
          <div className="p-4 rounded-2xl bg-gray-50 flex flex-col min-w-40 ">
            <h4 className="font-semibold text-gray-900">Status</h4>
            <p className="text-gray-700">Live</p>
          </div>
        </div>

        <Separator className="bg-gray-100" />
        <form action="" onSubmit={updateDetails}>
          <div className="">
            <div className="flex flex-col gap-4 ">
              <div className="flex flex-col gap-1">
                <label htmlFor="Chatbot Name">Chatbot Name</label>
                <Input
                  id="Chatbot Name"
                  name="name"
                  register={register}
                  placeholder="Chatbot Name"
                />
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex flex-row justify-between">
                  <label htmlFor="welcome_message">
                    Customize your welcome message
                  </label>
                  <GenerateWithAI />
                 {/* {isGenerating ? <LoadingSpinner className="text-blue-500" /> : <GenerateWithAI genWithAI={handleGenerateWithAI} error={error} />}  */}
                </div>

                <Textarea
                  name="welcome_message"
                  id="welcome_message"
                  register={register}
                />
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex flex-row justify-between">
                  <label htmlFor="fallback_message">
                    Customize your fallback message
                  </label>
                  <GenerateWithAI />
                  {/* {isGeneratingfallback ? <LoadingSpinner className="text-blue-500" /> : <GenerateWithAI genWithAI={handleGenerateFallbackMessageWithAI} error={errorFallback} />}  */}
                </div>
                <Textarea
                  name="fallback_message"
                  id="fallback_message"
                  register={register}
                />
              </div>

              <div className="flex flex-row justify-between p-4 border border-gray-200 rounded-lg">
                <Label htmlFor="collectUsersEmail">Collect users email</Label>
                <Switch
                  id="collectUsersEmail"
                  name="collectUsersEmail"
                  defaultChecked={chatbotData?.collect_user_email}
                />
              </div>
              <div className="flex flex-row gap-4 items-center justify-start text-white">
                <CustomButton type="submit" disabled={!isUpdating}>
                  {isUpdating ? <LoadingSpinner /> : "Save"}
                </CustomButton>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default Chatbot;
