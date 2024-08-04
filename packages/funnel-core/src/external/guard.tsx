"use client";
import { useEffect, useRef, useState } from "react";
import type { GuardProps } from "./types";

export const Guard = ({ condition, children, fallback, onFunnelRestrictEvent }: GuardProps) => {
  const [isRender, setIsRender] = useState(false);
  const isOnce = useRef(true);
  const canImmediateRender =
    (typeof condition === "boolean" && condition) ||
    (typeof condition === "function" && typeof condition() === "boolean" && condition());

  useEffect(() => {
    let result: boolean;
    const check = async () => {
      if (canImmediateRender) {
        return () => {};
      }

      if (typeof condition === "function") {
        result = await condition();
        if (result === false) {
          onFunnelRestrictEvent?.();
        } else {
          setIsRender(true);
        }
      }

      if (typeof condition === "boolean") {
        if (condition === false) {
          onFunnelRestrictEvent?.();
        } else {
          setIsRender(true);
        }
      }
    };

    if (isOnce.current) {
      check();
      isOnce.current = false;
    }
  }, [canImmediateRender, condition, onFunnelRestrictEvent]);

  return canImmediateRender || isRender ? children : fallback;
};
