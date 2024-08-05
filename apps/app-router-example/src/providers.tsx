"use client";
import { OverlayProvider } from "overlay-kit";
import type { PropsWithChildren } from "react";

export const Providers = ({ children }: PropsWithChildren) => {
  return <OverlayProvider>{children}</OverlayProvider>;
};
