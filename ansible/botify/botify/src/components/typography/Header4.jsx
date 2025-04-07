import { cn } from "@/lib/utils";
import React from "react";

function Header4({ children, className }) {
  return (
    <p className={cn("font-bold text-2xl leading-8 text-center", className)}>
      {children}
    </p>
  );
}

export default Header4;
