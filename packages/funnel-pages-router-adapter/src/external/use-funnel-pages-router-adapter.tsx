import { FunnelClient } from "@xionhub/funnel-client";
import { type FunnelOptions, type NonEmptyArray, useCoreFunnel } from "@xionhub/funnel-core";
import { useRouter } from "next/router";

export const useFunnelPagesRouterAdapter = <Steps extends NonEmptyArray<string>>(
  options: Omit<FunnelOptions<Steps>, "step">,
) => {
  const router = useRouter();
  const step = (router.query[options.funnelId] ?? undefined) as Steps[number] | undefined;
  const funnelClient = new FunnelClient(options);
  const [Funnel, { onStepChange, ...controller }] = useCoreFunnel({ ...options, step });
  return [Funnel, { ...controller, createStep: funnelClient.createStep }] as const;
};
