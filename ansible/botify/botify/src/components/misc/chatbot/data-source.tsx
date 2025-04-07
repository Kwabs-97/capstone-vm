import React, { useState } from "react";
import { Separator } from "@/components/ui/separator";
import Input from "@/components/ui/input";
import CustomDropzone from "../CustomDropzone";
import { search_right } from "@/assets/icons";
import { useForm } from "react-hook-form";
import { ChatbotDataInterface } from "@/app/types";
import axios from "axios";
import CustomButton from "@/components/form-elements/CustomButton";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

interface DataSourceProps {
  chatbotData?: ChatbotDataInterface;
}

function DataSource({ chatbotData }: DataSourceProps) {
  const [detectedFiles, setDetectedFiles] = useState<number | null>(null);

  const handleFileUpload = (file: File) => {
    if (file) {
      setDetectedFiles(1);
    } else setDetectedFiles(0);
  };
  const handleFileDelete = (file: File) => {
    setDetectedFiles(0);
  };

  // handling loading state
  const [isUpdating, setIsUpdating] = useState<Boolean>(false);

  //form-handling
  const { register, handleSubmit } = useForm();

  const updateDataSource = handleSubmit(async (data: ChatbotDataInterface) => {
    setIsUpdating(true);
    const chatbotDataSource = {
      ...data,
      id: chatbotData?.id,
    };
    try {
      const response = await axios.put(
        `/api/routes/chatbots/update/${chatbotData?.id}`,
        chatbotDataSource
      );
      console.log(response);
      setIsUpdating(false);
    } catch (error) {
      console.log("error");
    }
  });
  return (
    <>
      <form action="" onSubmit={updateDataSource}>
        <div className="flex flex-col gap-6 flex-1">
          <section className="flex flex-col gap-1">
            <h3 className="text-gray-900 text-lg leading-8 font-bold">
              Data sources
            </h3>
            <p className="text-gray-600 text-sm">
              Train your chatbot with data
            </p>
          </section>
          <section>
            <p className="text-gray-600">Upload files</p>
            <CustomDropzone />
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
                register={register}
                name="website_url"
                className="min-h-[50px]"
                placeholder="Enter website url"
                iconSrc={search_right}
              />
            </section>
          </section>
          <div className="flex flex-row gap-4 items-center justify-start text-white">
            <CustomButton type="submit" disabled={!isUpdating}>
              {isUpdating ? <LoadingSpinner /> : "Save"}
            </CustomButton>
          </div>
        </div>
      </form>
    </>
  );
}

export default DataSource;
