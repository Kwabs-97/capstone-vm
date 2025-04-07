"use client";

import * as React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils";

const labelVariants = cva(
  "text-base font-medium text-gray-700 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
);

const Label = React.forwardRef(
  (
    {
      className,
      children,
      htmlFor,
      ...props
    }: { className?: string; children: React.ReactNode; htmlFor?: string },
    ref: React.Ref<HTMLLabelElement>
  ) => (
    <LabelPrimitive.Root
      ref={ref}
      className={cn(labelVariants(), className)}
      {...props}
    >
      {children}
    </LabelPrimitive.Root>
  )
);
Label.displayName = LabelPrimitive.Root.displayName;

export { Label };
