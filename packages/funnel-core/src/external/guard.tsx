"use client";
import { useRef, useState } from "react";
import { useIsomorphicLayoutEffect } from "../internal/use-isomorphic-layout-effect";
import type { GuardProps } from "./types";

export const Guard = <T,>({ condition, children, fallback, onRestrict, conditionBy }: GuardProps<T>) => {
  const [isRender, setIsRender] = useState(false);
  const isOnce = useRef(true);

  useIsomorphicLayoutEffect(() => {
    if (!isOnce.current) {
      return () => {};
    }
    const callCondition = async () => {
      isOnce.current = false;
      const result = await condition();
      const byResult = conditionBy ? conditionBy(result) : result;
      if (typeof byResult !== "boolean") {
        throw new Error("condition should be boolean");
      }
      if (byResult) {
        setIsRender(true);
      }

      if (!byResult) {
        onRestrict?.(result);
      }
    };
    callCondition();
  }, []);

  return isRender ? children : fallback;
};
