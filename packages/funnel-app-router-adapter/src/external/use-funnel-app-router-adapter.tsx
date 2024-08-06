import {
  DEFAULT_FUNNEL_STEP_ID,
  type FunnelAdapterReturnType,
  type FunnelOptions,
  type NonEmptyArray,
  funnelQs,
  useCoreFunnel,
} from "@xionhub/funnel-core";
import { useRouter, useSearchParams } from "next/navigation";

export const useFunnelAppRouterAdapter = <Steps extends NonEmptyArray<string>>(
  options: Omit<FunnelOptions<Steps>, "step">,
): FunnelAdapterReturnType<Steps> => {
  const funnelId = options?.funnelId ?? DEFAULT_FUNNEL_STEP_ID;
  const router = useRouter();

  const queryStep = useSearchParams().get(funnelId);
  const step = (queryStep ?? undefined) as Steps[number] | undefined;
  const [Funnel, controller] = useCoreFunnel({ ...options, step });

  const onStepChange: FunnelAdapterReturnType<Steps>["1"]["onStepChange"] = (newStep, options) => {
    const deleteKeyList = Array.isArray(options?.deleteQueryParams)
      ? options?.deleteQueryParams
      : ([options?.deleteQueryParams].filter(Boolean) as string[]);

    const value = funnelQs.updateFunnelQs({ [funnelId]: newStep }, deleteKeyList);

    const newUrl = `${funnelQs.getPathName()}${value}`;

    if (options?.type === "replace") {
      return router.replace(newUrl);
    }

    if (options?.type === "back") {
      return router.back();
    }

    return router.push(newUrl);
  };

  return [Funnel, { ...controller, onStepChange }] as const;
};
