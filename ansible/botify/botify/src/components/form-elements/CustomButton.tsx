"use client";
import React from "react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface CustomButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  children: React.ReactNode;
  iconSrc?: string;
  onClick?: React.ReactEventHandler;
}
export default function CustomButton({
  children,
  className,
  onClick,
  iconSrc,
  ...props
}: CustomButtonProps) {
  return (
    <button
      className={cn(
        "bg-blue-600 rounded flex flex-row justify-center gap-1 items-center px-2 py-2.5 text-sm min-w-16",
        className
      )}
      onClick={onClick}
    
    >
      {iconSrc && (
        <div className="">
          <Image src={iconSrc} alt="icon" />
        </div>
      )}
      {children}
    </button>
  );
}
