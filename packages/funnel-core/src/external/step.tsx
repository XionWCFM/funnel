"use client";
import { noop } from "../internal/noop";
import { useIsomorphicLayoutEffect } from "../internal/use-isomorphic-layout-effect";
import type { NonEmptyArray, StepProps } from "./types";

export const Step = <Steps extends NonEmptyArray<string>>({
	children,
	pubsub,
	onFunnelRestrictEvent,
}: StepProps<Steps>) => {
	const handler = onFunnelRestrictEvent ?? noop;
	useIsomorphicLayoutEffect(() => {
		const unsubscribe = pubsub?.subscribe("FUNNEL_RESTRICT_EVENT", handler);
		return () => unsubscribe?.();
	}, []);
	return children;
};
