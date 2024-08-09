import { FunnelClient } from "@xionhub/funnel-client";
import { type FunnelOptions, type NonEmptyArray, useCoreFunnel } from "@xionhub/funnel-core";
import { useSearchParams } from "next/navigation";

export const useFunnelAppRouterAdapter = <Steps extends NonEmptyArray<string>>(
  options: Omit<FunnelOptions<Steps>, "step">,
) => {
  const funnelId = options.funnelId;
  const searchParams = useSearchParams();
  const queryStep = searchParams.get(funnelId);
  const funnelClient = new FunnelClient(options);
  const step = (queryStep ?? undefined) as Steps[number] | undefined;
  const [Funnel, { onStepChange, ...controller }] = useCoreFunnel({ ...options, step });
  return [Funnel, { ...controller, funnelClient }] as const;
};
