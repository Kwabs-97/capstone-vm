"use client";
import React from "react";
import CustomDropzone from "@/components/misc/CustomDropzone";
import { useState } from "react";
import { Separator } from "@/components/ui/separator";
import { search_right } from "@/assets/icons";
import { motion } from "framer-motion";
import { UseFormRegister } from "react-hook-form";

import Input from "@/components/ui/input";
interface stepProps {
  errors?: { [key: string]: { message: string } | undefined };
  register?: (name: string) => object; // Change this line
}
function Step1({ register, errors }: stepProps) {
  const [detectedFiles, setDetectedFiles] = useState<number | null>(null);
  const [step, setStep] = useState<number | null>(1);

  return (
    <motion.div
      className="flex flex-row gap-8  flex-grow overflow-hidden"
      initial={{ x: "-100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{ duration: 0.5 }}
    >
      {/* Data sources */}
      <div className="flex flex-col gap-6 flex-1">
        <section className="flex flex-col gap-1">
          <h3 className="text-gray-900 text-lg leading-8 font-bold">
            Data sources
          </h3>
          <p className="text-gray-600 text-sm">Train your chatbot with data</p>
        </section>
        <section>
          <p className="text-gray-600">Upload files</p>
          <CustomDropzone register={register} />
          <section className="flex flex-row gap-1 items-center">
            <Separator
              orientation="horizontal"
              className="w-[222.5px] h-[1px] bg-gray-200"
            />
            <p className="text-nowrap text-gray-500">or train from</p>
            <Separator
              orientation="horizontal"
              className="w-[222.5px] h-[1px] bg-gray-200"
            />
          </section>
          <section className="flex flex-col gap-2">
            <Input
              label="Website link"
              id="website_link"
              name="website_url"
              register={register}
              errors={{ website_url: errors?.website_url }}
              className="min-h-[50px]"
              placeholder="Enter website url"
              iconSrc={search_right}
            />
          </section>
        </section>
      </div>

      {/* Preview */}
      <div className="flex-1 flex flex-col gap-6">
        <section className="flex flex-col gap-1">
          <h3 className="text-gray-900 text-lg leading-8 font-bold">Preview</h3>
        </section>
        <section className="flex flex-col gap-6 p-6 bg-gray-50 rounded-lg">
          <div className="flex flex-col gap-1">
            <h4 className="text-sm font-bold text-black">
              Dectected files or links
            </h4>
            <p className="font-normal text-gray-600 text-xs">
              {detectedFiles ? detectedFiles : "None"}
            </p>
          </div>
          <div className="flex flex-col gap-1">
            <h4 className=" text-sm font-bold text-black">
              Dectected characters
            </h4>
            <p className="text-xs font-normal text-gray-600">0</p>
          </div>
          <div></div>
        </section>
      </div>
    </motion.div>
  );
}

export default Step1;
