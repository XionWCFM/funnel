import type { ReactNode } from "react";

export type NonEmptyArray<T> = readonly [T, ...T[]];

export type RoutesEventType = "replace" | "push" | "back";

export type DeleteQueryParams = { deleteQueryParams?: string[] | string };

export type FunnelStepChangeFunction<T extends NonEmptyArray<string>> = (
  step: T[number],
  options?: { type?: RoutesEventType } & DeleteQueryParams,
) => void;

export type RouteFunnelProps<Steps extends NonEmptyArray<string>> = Omit<FunnelProps<Steps>, "steps" | "step">;

export interface FunnelProps<Steps extends NonEmptyArray<string>> {
  steps: Steps;
  step: Steps[number] | undefined;
  children: Array<React.ReactElement<StepProps<Steps>>> | React.ReactElement<StepProps<Steps>>;
}

export interface StepProps<Steps extends NonEmptyArray<string>> {
  name: Steps[number];
  children: React.ReactNode;
}

export interface GuardProps {
  condition: boolean | (() => boolean | Promise<boolean>);
  children?: ReactNode;
  onRestrict?: () => void;
  fallback?: ReactNode;
}

export type CreateFunnelStepFunction<Steps extends NonEmptyArray<string>> = (
  step: Steps[number],
  options?: { deleteQueryParams?: string[] | string; searchParams?: URLSearchParams },
) => Record<string, unknown>;

export type FunnelAdapterReturnType<Steps extends NonEmptyArray<string>> = [
  ((props: RouteFunnelProps<Steps>) => JSX.Element) & {
    Step: (props: StepProps<Steps>) => JSX.Element;
    Guard: (props: GuardProps) => JSX.Element;
  },
  {
    funnelId: string;
    step: Steps[number] | undefined;
    onStepChange: FunnelStepChangeFunction<Steps>;
    createFunnelStep: CreateFunnelStepFunction<Steps>;
  },
];

export type FunnelOptions<T extends NonEmptyArray<string>> = {
  steps: T;
  step?: T[number] | undefined;
  funnelId: string;
};
