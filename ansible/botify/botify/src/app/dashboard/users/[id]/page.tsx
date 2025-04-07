"use client";
import CustomButton from "@/components/form-elements/CustomButton";
import React from "react";
import { ArrowLeft, Ellipsis } from "lucide-react";
import { Avatar } from "@/assets/icons";
import { useRouter } from "next/navigation";
import NavigateBack from "@/components/misc/ArrowLeft";

function Page({ params }: { params: { id: string } }) {
  const router = useRouter();
  return (
    <div className="flex flex-col  overflow-hidden ">
      {/* header */}
      <div className="header py-8 px-12 border-b border-b-gray-200">
        <div className="flex flex-row justify-between items-center">
          <div className="flex flex-row gap-4 items-center">
            <NavigateBack />
            <h3 className="text-gray-900 text-2xl leading-8 font-bold">
              User ID
            </h3>
          </div>
          <div className="">
            <CustomButton className=" border px-4  border-gray-300 text-gray-700 text-sm bg-white shadow-sm">
              Delete
            </CustomButton>
          </div>
        </div>
      </div>

      {/* content */}
      <div className="flex flex-row">
        <div className="py-6 px-8 flex flex-col gap-6 flex-1">
          <div className="flex flex-row gap-2.5 items-center">
            <Avatar />
            <h4 className="font-bold text-lg text-gray-900">User ID</h4>
          </div>
          <div className="flex flex-col gap-4 ">
            <div className="border border-gray-200 py-3 rounded-2xl px-4 flex flex-row justify-between">
              <div className="flex flex-col gap-1">
                <h4 className="font-semibold text-base text-gray-900">Name</h4>
                <p className="text-gray-600 text-base font-normal">
                  June 16, 2023
                </p>
              </div>
              <div>
                <Ellipsis className="text-gray-500" />
              </div>
            </div>
            <div className="border border-gray-200 py-3 rounded-2xl px-4 flex flex-row justify-between">
              <div className="flex flex-col gap-1">
                <h4 className="font-semibold text-base text-gray-900">Email</h4>
                <p className="text-gray-600 text-base font-normal">Public</p>
              </div>
              <div>
                <Ellipsis className="text-gray-500" />
              </div>
            </div>
            <div className="border border-gray-200 py-3 rounded-2xl px-4 flex flex-row justify-between">
              <div className="flex flex-col gap-1">
                <h4 className="font-semibold text-base text-gray-900">
                  Bot Source
                </h4>
                <p className="text-gray-600 text-base font-normal">Public</p>
              </div>
              <div>
                <Ellipsis className="text-gray-500" />
              </div>
            </div>
            <div className="border border-gray-200 py-3 rounded-2xl px-4 flex flex-row justify-between">
              <div className="flex flex-col gap-1">
                <h4 className="font-semibold text-base text-gray-900">
                  Last Seen
                </h4>
                <p className="text-gray-600 text-base font-normal">
                  {" "}
                  June 16, 2023
                </p>
              </div>
              <div>
                <Ellipsis className="text-gray-500" />
              </div>
            </div>
            <div className="border border-gray-200 py-3 rounded-2xl px-4 flex flex-row justify-between">
              <div className="flex flex-col gap-1">
                <h4 className="font-semibold text-base text-gray-900">
                  First Seen
                </h4>
                <p className="text-gray-600 text-base font-normal">
                  {" "}
                  June 16, 2023
                </p>
              </div>
              <div>
                <Ellipsis className="text-gray-500" />
              </div>
            </div>
          </div>
        </div>
        <div className="flex-1 py-6 px-8 flex flex-col gap-6 border-l border-gray-200 ">
          <h4 className="text-gray-900 font-bold text-lg">User Sessions</h4>
          <div className="flex flex-col gap-2 px-8 py-6 rounded-lg bg-gray-50">
            <div className="flex flex-row justify-between ">
              <p className="text-base font-medium text-gray-900">
                What is jobmanor?
              </p>
              <p className="text-blue-500 text-sm font-normal">Jobmanor</p>
            </div>
            <div>
              <p className="text-gray-600 font-normal text-sm">
                Jan 24, 2024 9:02 PM
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
