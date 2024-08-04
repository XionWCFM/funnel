import { Children, isValidElement } from "react";
import type { FunnelProps, NonEmptyArray, StepProps } from "./types";

export const Funnel = <Steps extends NonEmptyArray<string>>({ step, steps, children }: FunnelProps<Steps>) => {
	const validChildren = Children.toArray(children)
		.filter(isValidElement)
		.filter((item) => steps.includes((item.props as Partial<StepProps<Steps>>).name ?? "")) as Array<
		React.ReactElement<StepProps<Steps>>
	>;
	const targetStep = validChildren.find((child) => child.props.name === step);
	return <>{targetStep}</>;
};
