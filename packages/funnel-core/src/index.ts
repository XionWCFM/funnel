import { FunnelPubsub } from "./external/funnel-pubsub";
import {
	FUNNEL_RESTRICT_EVENT,
	type FlowOptions,
	type FunnelEvent,
	type FunnelProps,
	type FunnelStepChangeFunction,
	type GuardProps,
	type NonEmptyArray,
	type RouteFunnelProps,
	type RoutesEventType,
	type StepProps,
} from "./external/types";
import { useCoreFunnel } from "./external/use-core-funnel";

export { useCoreFunnel, FUNNEL_RESTRICT_EVENT, FunnelPubsub };

export type {
	NonEmptyArray,
	RoutesEventType,
	FunnelStepChangeFunction,
	RouteFunnelProps,
	FlowOptions,
	FunnelEvent,
	FunnelProps,
	StepProps,
	GuardProps,
};
