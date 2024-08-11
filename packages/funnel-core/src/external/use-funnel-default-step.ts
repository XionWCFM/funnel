import { useEffect } from "react";

export const useFunnelDefaultStep = (step: string | undefined, callback: () => void) => {
  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (step === undefined) {
      callback();
    }
  }, []);
};
