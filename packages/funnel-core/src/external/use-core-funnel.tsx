import { useEffect, useMemo } from "react";
import { useDraft } from "../internal/use-draft";
import { Funnel } from "./funnel";
import { Guard } from "./guard";
import { Step } from "./step";
import type {
  FunnelOptions,
  FunnelStepChangeFunction,
  GuardProps,
  NonEmptyArray,
  RouteFunnelProps,
  StepProps,
} from "./types";

export const useCoreFunnel = <Steps extends NonEmptyArray<string>>(
  options: FunnelOptions<Steps> & { onStepChange?: FunnelStepChangeFunction<Steps> },
) => {
  const [_step, _setStep] = useDraft<Steps[number] | undefined>(options?.step);
  const steps = options.steps;
  const step = options?.step;
  const funnelId = options?.funnelId;

  const _onStepChange: FunnelStepChangeFunction<Steps> = (param: Steps[number], routeOptions) => {
    _setStep(param);
  };

  const onStepChange = options?.onStepChange ?? _onStepChange;

  const FunnelComponent = useMemo(() => {
    return Object.assign(
      (props: RouteFunnelProps<Steps>) => {
        return <Funnel<Steps> step={step} steps={steps} {...props} />;
      },
      {
        Step: (props: StepProps<Steps>) => {
          return <Step {...props} />;
        },
        Guard: (props: GuardProps) => {
          return <Guard {...props} />;
        },
      },
    );
  }, [step, steps]);

  return [FunnelComponent, { funnelId, step, onStepChange }] as const;
};
