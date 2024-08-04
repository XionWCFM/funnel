import { type FlowOptions, type NonEmptyArray, funnelQs, useCoreFunnel } from "@xionhub/funnel-core";
import { useRouter, useSearchParams } from "next/navigation";

const useFunnelAppRouterAdapter = <Steps extends NonEmptyArray<string>>(steps: Steps, options: FlowOptions<Steps>) => {
	const DEFAULT_FUNNEL_ID = "default-funnel-id";
	const router = useRouter();
	const queryStep = useSearchParams().get(options?.funnelId ?? DEFAULT_FUNNEL_ID);
	const step = (queryStep ?? steps[0]) as Steps[number];
	const [Funnel, controller] = useCoreFunnel(steps, options);
};
