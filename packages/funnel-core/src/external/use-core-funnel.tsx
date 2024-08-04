import { useMemo } from "react";
import { useDraft } from "../internal/use-draft";
import { Funnel } from "./funnel";
import { Guard } from "./guard";
import { Step } from "./step";
import type { GuardProps, NonEmptyArray, RouteFunnelProps, StepProps, UseFunnelOptions } from "./types";

export const useCoreFunnel = <Steps extends NonEmptyArray<string>>(steps: Steps, options?: UseFunnelOptions<Steps>) => {
  const initialState = options?.initialStep ?? steps[0];
  const [_step, _setStep] = useDraft(initialState);
  const step = options?.step;
  const funnelId = options?.funnelId ?? "step";
  const _onStepChange = (param: Steps[number]) => {
    _setStep(param);
  };

  const FunnelComponent = useMemo(() => {
    return Object.assign(
      (props: RouteFunnelProps<Steps>) => {
        return <Funnel<Steps> step={step} steps={steps} {...props} />;
      },
      {
        Step: (props: Omit<StepProps<Steps>, "pubsub">) => {
          return <Step {...props} />;
        },
        Guard: (props: Omit<GuardProps, "pubsub">) => {
          return <Guard {...props} />;
        },
      },
    );
  }, [step, steps]);

  return [FunnelComponent, { funnelId, step, onStepChange: _onStepChange }] as const;
};
