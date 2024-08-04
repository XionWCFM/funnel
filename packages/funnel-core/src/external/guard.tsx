"use client";
import { useEffect, useRef, useState } from "react";
import type { GuardProps } from "./types";

export const Guard = ({ pubsub, condition, children, fallback }: GuardProps) => {
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
          pubsub.publish("FUNNEL_RESTRICT_EVENT");
        } else {
          setIsRender(true);
        }
      }

      if (typeof condition === "boolean") {
        if (condition === false) {
          console.log("work???");
          pubsub.publish("FUNNEL_RESTRICT_EVENT");
        } else {
          setIsRender(true);
        }
      }
    };

    if (isOnce.current) {
      check();
      isOnce.current = false;
    }
  }, [canImmediateRender, condition, pubsub]);

  return canImmediateRender || isRender ? children : fallback;
};
