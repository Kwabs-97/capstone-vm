'use client'
import React from "react";
import { Label } from "../ui/label";
import Image from "next/image";
import { sparksIcon } from "@/assets/icons";

interface LabelProps {
  htmlFor?: string;
  autogenerate?: boolean;
  children: React.ReactNode;
  genWelcomeMessage?: () => void;
}

// const genWelcomeMessage = async () => {
//   console.log("genWelcomeMessage is clicked from Custom label");
// };

function CustomLabel({ htmlFor, children, genWelcomeMessage }: LabelProps) {
  return (
    <div
      className="flex flex-row items-center justify-between hover:cursor-pointer "
      onClick={genWelcomeMessage}
    >
      <Label htmlFor={htmlFor}>{children}</Label>
      <div className="flex flex-row gap-2.5">
        <Image src={sparksIcon} alt="icon" className="w-auto h-auto"/>
        <p className="text-blue-500 text-sm font-normal">Let Boti generate</p>
      </div>
    </div>
  );
}

export default CustomLabel;
