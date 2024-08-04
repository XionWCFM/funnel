import type { ReactNode } from "react";
import type { FunnelPubsub } from "./funnel-pubsub";

export type NonEmptyArray<T> = readonly [T, ...T[]];

export type RoutesEventType = "replace" | "push" | "back";

export type FunnelStepChangeFunction<T extends NonEmptyArray<string>> = (
	step: T[number],
	options?: { type?: RoutesEventType; deleteQueryParams?: string[] | string },
) => void;

export type RouteFunnelProps<Steps extends NonEmptyArray<string>> = Omit<FunnelProps<Steps>, "steps" | "step">;

export type UseFunnelOptions<T extends NonEmptyArray<string>> = {
	step?: T[number];
	initialStep?: T[number];
	funnelId?: string;
	pubsub?: FunnelPubsub;
};

export const FUNNEL_RESTRICT_EVENT = "FUNNEL_RESTRICT_EVENT" as const;
export type FunnelEvent = typeof FUNNEL_RESTRICT_EVENT;

export interface FunnelProps<Steps extends NonEmptyArray<string>> {
	steps: Steps;
	step: Steps[number] | undefined;
	children: Array<React.ReactElement<StepProps<Steps>>> | React.ReactElement<StepProps<Steps>>;
}

export interface StepProps<Steps extends NonEmptyArray<string>> {
	name: Steps[number];
	children: React.ReactNode;
	pubsub?: FunnelPubsub;
	onFunnelRestrictEvent?: () => void;
}

export interface GuardProps {
	pubsub: FunnelPubsub;
	condition: boolean | (() => boolean | Promise<boolean>);
	children?: ReactNode;
	fallback?: ReactNode;
}

export type FunnelAdapterReturnType<Steps extends NonEmptyArray<string>> = [
	((props: RouteFunnelProps<Steps>) => JSX.Element) & {
		Step: (props: Omit<StepProps<Steps>, "pubsub">) => JSX.Element;
		Guard: (props: Omit<GuardProps, "pubsub">) => JSX.Element;
	},
	{
		funnelId: string;
		step: Steps[number] | undefined;
		pubsub: FunnelPubsub;
		onStepChange: FunnelStepChangeFunction<Steps>;
	},
];
