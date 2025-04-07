"use client";

import React, { useEffect, useRef, useState } from "react";
import NavigateBack from "@/components/misc/ArrowLeft";
import CustomButton from "@/components/form-elements/CustomButton";
// import Chatbot from "@/components/misc/chatbot/chatbot";
import Playground from "@/components/misc/chatbot/playground";
import DataSource from "@/components/misc/chatbot/data-source";
import Settings from "@/components/misc/chatbot/settings";
import axios from "axios";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import Chatbot from "@/components/update-chatbots-components/details";
import { ChatbotDataInterface } from "@/app/types";
import { useForm } from "react-hook-form";
const Page = ({ params }: { params: { id: string } }) => {
  const id = params.id;

  const tabs = ["Chatbot", "Data Sources", "Settings"];
  const [activeStep, setActiveStep] = useState("Chatbot");
  const [dashStyles, setDashStyles] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const [chatbotData, setChatbotData] = useState<ChatbotDataInterface>({});

  const {
    register,

    watch,
    formState: { isSubmitting, errors },
    handleSubmit,
  } = useForm();

  const tabRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const activeIndex = tabs.indexOf(activeStep);
    const activeNav = tabRefs.current[activeIndex];

    if (activeNav) {
      const { offsetWidth, offsetLeft } = activeNav;
      setDashStyles({
        width: `${offsetWidth}px`,
        transform: `translateX(${offsetLeft}px)`,
      });
    }
  }, [activeStep]);

  useEffect(() => {
    async function getChatbot() {
      try {
        setIsLoading(true);
        const res = await axios.get(`/api/routes/chatbots/${id}`);
        console.log(res);
        setChatbotData(res.data.chatbot);
        // console.log(res.data.chatbot);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }
    getChatbot();
  }, [id]);



  const chatbotDetails = {
    id,
    name: chatbotData && chatbotData?.name,
    welcome_message: chatbotData && chatbotData?.welcome_message,
    fallback_message: chatbotData && chatbotData?.fallback_message,
  };

  const settings = {
    id,
    color: chatbotData && chatbotData?.color,
    offline_fallback_notification_email:
      chatbotData && chatbotData?.offline_fallback_notification_email,
  };

  const dataSource = {
    id,
    files: "",
    website_url: chatbotData && chatbotData?.website_url,
  };

  return (
    <div className="flex flex-col">
      {/*Header*/}

      <div className="header py-8 px-12 border border-b-gray-200">
        <div className="flex flex-row justify-between items-center">
          <div className="flex flex-row gap-4 items-center">
            {/* <ArrowLeft  /> */}
            <NavigateBack />
            <p className="h4 font-bold text-gray-900">
              {chatbotData && chatbotData?.name}
            </p>
          </div>
          <div className="url flex flex-row gap-4">
            <div className="bg-blue-50 text-blue-500 p-2.5 rounded-lg text-sm">
              <p>https://www.botify.app.com/Jobmanor</p>
            </div>
            <CustomButton>Copy Link</CustomButton>
          </div>
        </div>
      </div>

      {/*Main */}

      {isLoading && (
        <div>
          <LoadingSpinner className="" />
        </div>
      )}
      <div className="flex flex-row gap-6">
        {/*Data */}
        <div className="flex flex-col px-8 flex-1">
          <div className="py-4">
            {/*Navigation*/}
            <nav className="flex flex-row gap-10 w-full relative border-b border-gray-200">
              {tabs.map((navItem, i) => (
                <div
                  key={i}
                  ref={(el) => {
                    tabRefs.current[i] = el;
                  }}
                  className="cursor-pointer"
                  onClick={() => setActiveStep(navItem)}
                >
                  <p
                    className={`py-2.5 text-sm ${
                      activeStep === navItem ? "text-blue-500" : "text-gray-500"
                    }`}
                  >
                    {navItem}
                  </p>
                </div>
              ))}
              <span
                className="absolute bottom-0 h-0.5 bg-blue-500 transition-all duration-300"
                style={dashStyles}
              />
            </nav>
          </div>

          {activeStep === "Chatbot" && (
            <div>
              <Chatbot chatbotData={chatbotDetails} />
            </div>
          )}
          {activeStep === "Data Sources" && (
            <div>
              <DataSource chatbotData={dataSource} />
            </div>
          )}
          {activeStep === "Settings" && <Settings chatbotData={settings} />}
        </div>

        {/*Chatbot playground */}
        <div className="flex-1">
          <Playground chatbotData={chatbotData} />
        </div>
      </div>
    </div>
  );
};

export default Page;
