import { DEFAULT_FUNNEL_STEP_ID } from "./external/constant";
import { FunnelClient, funnelOptions } from "./external/external-utils";
import { Guard as FunnelGuard } from "./external/guard";
import { funnelQs } from "./external/query-string";
import type {
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

export { useCoreFunnel, FunnelGuard, funnelQs, funnelOptions, FunnelClient, DEFAULT_FUNNEL_STEP_ID };

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
};
