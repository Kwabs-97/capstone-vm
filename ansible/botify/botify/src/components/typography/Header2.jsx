import { cn } from "@/lib/utils";
import React from "react";

function Header2({ children, className }) {
  return (
    <p className={cn("font-bold text-5xl leading-[48px]", className)}>
      {children}
    </p>
  );
}

export default Header2;
