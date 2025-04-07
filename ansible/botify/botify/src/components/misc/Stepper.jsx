import React from "react";

function Stepper({ currentStep, totalSteps }) {
  return (
    <div className="flex flex-row gap-4">
      {Array.from({ length: totalSteps }).map((_, index) => (
        <div
          key={index}
          className={`h-1 w-36 rounded-md ${
            index < currentStep ? "bg-blue-600" : "bg-gray-300"
          }`}
        ></div>
      ))}
    </div>
  );
}

export default Stepper;
