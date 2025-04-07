"use client";
import { ReactElement } from "react";
import { useState } from "react";

export function useMultistepFormHook(steps: ReactElement[]) {
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const step = steps[currentStepIndex];

  const next = function () {
    setCurrentStepIndex((i) => {
      if (i >= steps.length - 1) {
        return i;
      }
      return i + 1;
    });
  };

  const back = function () {
    setCurrentStepIndex((i) => {
      if (i <= 0) {
        return i;
      }
      return i - 1;
    });
  };

  const isFirstStep = currentStepIndex === 0;
  const isLastStep = currentStepIndex === steps.length - 1;

  return {
    steps,
    step,
    next,
    currentStepIndex,
    back,
    isLastStep,
    isFirstStep,
  };
}
