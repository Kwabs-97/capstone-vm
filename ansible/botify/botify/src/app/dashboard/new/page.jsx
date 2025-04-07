"use client";
import React from "react";

import CustomButton from "@/components/form-elements/CustomButton";
import Stepper from "@/components/misc/Stepper";
import Step1 from "@/components/misc/chatbot-steps/Step1";
import Step2 from "@/components/misc/chatbot-steps/Step2";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { chatbotSchema } from "@/lib/schema";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import SettingUpChatbot from "@/components/misc/setting-up";
import NavigateBack from "@/components/misc/ArrowLeft";
import { useMultistepFormHook } from "@/hooks/useMultistepFormHook";

function Page() {
  //form-handling
  const {
    formState: { errors, isSubmitting },
    register,
    handleSubmit,
  } = useForm();

  const onSubmit = handleSubmit(async (data) => {
    console.log("chatbot data from the frontend ----------------", data);
    try {
      const res = await axios.post("/api/routes/new", data);
      console.log(res);
      if (res.status === 200) {
        router.push("/dashboard");
      }
    } catch (error) {
      console.log("error creating new chatbot", error);
    }
  });

  //routing
  const router = useRouter();

  const { step, steps, currentStepIndex, next, back, isFirstStep, isLastStep } =
    useMultistepFormHook([
      <Step1 key="step1" register={register} errors={errors} />,
      <Step2 key="step2" register={register} errors={errors} />,
    ]);
  return (
    <>
      {isSubmitting ? (
        <div className="flex w-screen h-screen items-center justify-center">
          <SettingUpChatbot />
        </div>
      ) : (
        <div className="flex flex-col w-full h-full overflow-hidden gap-5">
          {/* Header */}
          <div className="header py-6 px-12 border-b border-b-gray-200">
            <div className="flex flex-row justify-between items-center">
              <div className="flex flex-row gap-1 items-center">
                <NavigateBack />
                <h3 className="text-gray-900 text-lg leading-8 font-bold">
                  Create a new chatbot
                </h3>
              </div>
            </div>
          </div>
          {/* Preview*/}
          {/* <Step1 /> */}
          {/* <Step2 /> */}
          <div className="flex-grow px-12">
            <form onSubmit={onSubmit}>{step}</form>
          </div>

          {/* Steps */}
          <div className="">
            <section className="flex flex-row justify-between px-12 py-6">
              <div className="flex flex-col gap-2">
                <div className="text-gray-500 text-sm">
                  step {currentStepIndex + 1} of {steps.length}
                </div>
                <Stepper
                  totalSteps={steps.length}
                  currentStep={currentStepIndex + 1}
                />
              </div>
              <div className="flex flex-row gap-4">
                <CustomButton
                  className={`bg-white text-blue-600 border border-blue-600 ${
                    isFirstStep
                      ? "bg-gray-200 border-none text-white cursor-not-allowed"
                      : "bg-white"
                  }`}
                  onClick={back}
                  disabled={isFirstStep}
                >
                  Go back
                </CustomButton>
                <CustomButton
                  onClick={() => {
                    isFirstStep && next();
                    isLastStep && onSubmit();
                  }}
                  disabled={isLastStep || isSubmitting}
                  className={`${step === 2 && "px-6"} ${
                    isSubmitting
                      ? "bg-gray-200 border-none text-white cursor-not-allowed"
                      : ""
                  }`}
                >
                  {isSubmitting && <LoadingSpinner />}
                  {isLastStep ? "Finish" : "Continue"}
                </CustomButton>
              </div>
            </section>
          </div>
        </div>
      )}
    </>
  );
}

export default Page;
