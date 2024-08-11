import { funnelOptions } from "./external/external-utils";
import { Guard as FunnelGuard } from "./external/guard";
import type {
  CreateFunnelStepFunction,
  FunnelAdapterReturnType,
  FunnelOptions,
  FunnelProps,
  FunnelStepChangeFunction,
  GuardProps,
  NonEmptyArray,
  RouteFunnelProps,
  RoutesEventType,
  StepProps,
} from "./external/types";
import { useCoreFunnel } from "./external/use-core-funnel";
import { useFunnelDefaultStep } from "./external/use-funnel-default-step";

export { useCoreFunnel, FunnelGuard, funnelOptions, useFunnelDefaultStep };

export type {
  NonEmptyArray,
  RoutesEventType,
  FunnelStepChangeFunction,
  RouteFunnelProps,
  FunnelProps,
  StepProps,
  GuardProps,
  FunnelAdapterReturnType,
  FunnelOptions,
  CreateFunnelStepFunction,
};
