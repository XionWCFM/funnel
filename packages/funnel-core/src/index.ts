import { FunnelPubsub } from "./external/funnel-pubsub";
import { Guard as FunnelGuard } from "./external/guard";
import { funnelQs } from "./external/query-string";
import {
  FUNNEL_RESTRICT_EVENT,
  type FunnelAdapterReturnType,
  type FunnelEvent,
  type FunnelProps,
  type FunnelStepChangeFunction,
  type GuardProps,
  type NonEmptyArray,
  type RouteFunnelProps,
  type RoutesEventType,
  type StepProps,
  type UseFunnelOptions,
} from "./external/types";
import { useCoreFunnel } from "./external/use-core-funnel";

export { useCoreFunnel, FUNNEL_RESTRICT_EVENT, FunnelPubsub, funnelQs, FunnelGuard };

export type {
  NonEmptyArray,
  RoutesEventType,
  FunnelStepChangeFunction,
  RouteFunnelProps,
  UseFunnelOptions,
  FunnelEvent,
  FunnelProps,
  StepProps,
  GuardProps,
  FunnelAdapterReturnType,
};
