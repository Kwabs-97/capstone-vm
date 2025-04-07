import React from "react";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

function loading() {
  return (
    <div className="flex min-h-screen w-screen items-center justify-center">
      <LoadingSpinner className="text-gray-400" />
    </div>
  );
}

export default loading;
