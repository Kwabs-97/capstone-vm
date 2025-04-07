import { cn } from "@/lib/utils";
import React from "react";

function Container({ children, className }) {
  return (
    <div className={cn("flex flex-col p-16 items-center gap-20", className)}>
      {children}
    </div>
  );
}

export default Container;
