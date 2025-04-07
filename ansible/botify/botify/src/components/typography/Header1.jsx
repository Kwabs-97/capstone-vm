import { cn } from "@/lib/utils";
import React from "react";

function Header1({ children, className }) {
  return (
    <p
      className={cn(
        "font-bold text-[56px] leading-[67.2px] text-center",
        className
      )}
    >
      {children}
    </p>
  );
}

export default Header1;
