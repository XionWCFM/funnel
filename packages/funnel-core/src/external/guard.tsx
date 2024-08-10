"use client";
import { useRef, useState } from "react";
import { useIsomorphicLayoutEffect } from "../internal/use-isomorphic-layout-effect";
import type { GuardProps } from "./types";

export const Guard = <T,>(props: GuardProps<T>) => {
  const { condition, onRestrict, fallback, children } = props;
  const [isRender, setIsRender] = useState(false);
  const isOnce = useRef(true);

  useIsomorphicLayoutEffect(() => {
    if (!isOnce.current) {
      return () => {};
    }
    const callCondition = async () => {
      isOnce.current = false;
      const result = typeof condition === "function" ? await condition() : condition;
      const byResult = props?.conditionBy ? props?.conditionBy?.(result as Awaited<T>) : result;
      if (typeof byResult !== "boolean") {
        throw new Error("condition should be boolean");
      }
      if (byResult) {
        setIsRender(true);
      }

      if (!byResult) {
        onRestrict?.(result as Awaited<T>);
      }
    };
    callCondition();
  }, []);

  return isRender ? children : fallback;
};
