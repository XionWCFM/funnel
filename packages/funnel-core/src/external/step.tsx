"use client";
import type { NonEmptyArray, StepProps } from "./types";

export const Step = <Steps extends NonEmptyArray<string>>({ children }: StepProps<Steps>) => {
  return children;
};
