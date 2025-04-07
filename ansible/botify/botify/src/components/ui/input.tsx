"use client";
import * as React from "react";
import { useState, forwardRef } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import CustomLabel from "../misc/CustomLabel";
import { Label } from "./label";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  type?: "text" | "email" | "password" | "number";
  name: string;
  label?: React.ReactNode;
  id?: string;
  labelWithAutogenerate?: React.ReactNode;
  iconSrc?: string;
  register?: (name: string) => object;
  autosaveOnBlur?: () => void;
  customLabel?: React.ReactNode;
  onFocus?: () => void;
  onBlur?: () => void;
  errors?: {
    [key: string]:
      | {
          message: string;
        }
      | undefined;
  };
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      errors,
      register,
      id,
      onFocus,
      name,
      className,
      onChange,
      labelWithAutogenerate,
      onBlur,
      customLabel,
      autosaveOnBlur,
      iconSrc,
      ...props
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = useState<boolean>(false);

    return (
      <div className="flex flex-col gap-1">
        {label && <Label htmlFor={id}>{label}</Label>}
        {/* {labelWithAutogenerate && <CustomLabel>{customLabel}</CustomLabel>} */}

        <div
          className={cn(
            `flex flex-row rounded-lg border bg-gray-50 min-h-[40px] border-lightGray items-center justify-between duration-100 ${
              isFocused ? "border-2 border-blue-500" : ""
            }`,
            className
          )}
        >
          <input
            className="border-none h-full w-full px-4 py-3 text-gray-900 bg-transparent outline-none placeholder:text-gray-400"
            {...register?.(name)}
            onFocus={() => {
              setIsFocused(true);
            }}
            onBlur={() => {
              setIsFocused(false);
              console.log("onBlur");
            }}
            id={id}
            {...props}
          />

          {iconSrc && (
            <div className="px-2">
              <Image src={iconSrc} alt="icon" />
            </div>
          )}
        </div>
        {errors?.[name]?.message && (
          <p className="text-red-500 text-sm font-normal">
            {errors[name]?.message}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
