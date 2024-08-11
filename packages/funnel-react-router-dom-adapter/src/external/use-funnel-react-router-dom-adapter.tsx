import { FunnelClient } from "@xionhub/funnel-client";
import { type FunnelOptions, type NonEmptyArray, useCoreFunnel } from "@xionhub/funnel-core";
import { useLocation } from "react-router-dom";

export const useFunnelReactRouterDomAdapter = <Steps extends NonEmptyArray<string>>(
  options: Omit<FunnelOptions<Steps>, "step">,
) => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const step = (searchParams.get(options.funnelId) ?? undefined) as Steps[number] | undefined;
  const [Funnel, { onStepChange, ...controller }] = useCoreFunnel({ ...options, step });
  const funnelClient = new FunnelClient(options);
  return [Funnel, { ...controller, createStep: funnelClient.createStep }] as const;
};
