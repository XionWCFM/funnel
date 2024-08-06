import { useMemo } from "react";
import { useDraft } from "../internal/use-draft";
import { DEFAULT_FUNNEL_STEP_ID } from "./constant";
import { Funnel } from "./funnel";
import { Guard } from "./guard";
import { Step } from "./step";
import type { FunnelOptions, GuardProps, NonEmptyArray, RouteFunnelProps, StepProps } from "./types";

export const useCoreFunnel = <Steps extends NonEmptyArray<string>>(options: FunnelOptions<Steps>) => {
  const [_step, _setStep] = useDraft(options?.step ?? options?.steps[0]);
  const steps = options.steps;
  const step = options?.step;
  const funnelId = options?.funnelId ?? DEFAULT_FUNNEL_STEP_ID;

  const _onStepChange = (param: Steps[number]) => {
    _setStep(param);
  };

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

  return [FunnelComponent, { funnelId, step, onStepChange: _onStepChange }] as const;
};
