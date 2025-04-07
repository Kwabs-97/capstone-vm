"use client";
import * as React from "react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Label } from "./label";
import CustomLabel from "../misc/CustomLabel";

interface TextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string;
  name: string;
  genWelcomeMessage?: () => void;
  label?: React.ReactNode;
  labelWithAutogenerate?: React.ReactNode;
  register?: (name: string) => object;
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  onFocus?: () => void;
  onBlur?: () => void;
  errors?: {
    [key: string]:
      | {
          message: string;
        }
      | undefined;
  };
  customLabel?: React.ReactNode;
}

const Textarea = ({
  className,
  placeholder,
  onFocus,
  name,
  label,
  register,
  customLabel,
  genWelcomeMessage,
  labelWithAutogenerate,
  onChange,
  errors,
  onBlur,
  ...props
}: TextAreaProps) => {
  const [isFocused, setIsFocused] = useState<boolean>(false);
  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-row justify-between">
        {label && <Label>{label}</Label>}
        {labelWithAutogenerate && <CustomLabel>{customLabel}</CustomLabel>}
      </div>

      <div
        className={cn(
          `flex flex-row rounded  px-2 py-1 bg-gray-50 border h-[70px] border-lightGray items-center justify-between duration-100 ${
            isFocused ? "border-2 border-blue-500" : ""
          }`,
          className
        )}
      >
        <textarea
          className={cn(
            "border-none h-full text-gray-900 w-full bg-transparent focus:outline-none",
            className
          )}
          {...register?.(name)}
          placeholder={placeholder}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...props}
        />
      </div>
      {errors && (
        <p className="text-red-500 text-sm font-normal">
          {errors[name]?.message}
        </p>
      )}
    </div>
  );
};

export default Textarea;
