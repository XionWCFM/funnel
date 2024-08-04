import {
  type FunnelAdapterReturnType,
  type NonEmptyArray,
  type UseFunnelOptions,
  funnelQs,
  useCoreFunnel,
} from "@xionhub/funnel-core";
import { useRouter, useSearchParams } from "next/navigation";

export const useFunnelAppRouterAdapter = <Steps extends NonEmptyArray<string>>(
  steps: Steps,
  options?: Omit<UseFunnelOptions<Steps>, "step">,
): FunnelAdapterReturnType<Steps> => {
  const DEFAULT_FUNNEL_ID = "default-funnel-id";
  const funnelId = options?.funnelId ?? DEFAULT_FUNNEL_ID;
  const router = useRouter();

  const queryStep = useSearchParams().get(funnelId);
  const step = queryStep;

  const [Funnel, controller] = useCoreFunnel(steps, {
    funnelId,
    step,
    initialStep: options?.initialStep,
    pubsub: options?.pubsub,
  } as UseFunnelOptions<Steps>);

  const onStepChange: FunnelAdapterReturnType<Steps>["1"]["onStepChange"] = (newStep, options) => {
    const deleteKeyList = Array.isArray(options?.deleteQueryParams)
      ? options?.deleteQueryParams
      : ([options?.deleteQueryParams].filter(Boolean) as string[]);

    const value = funnelQs.createQueryParamsResult({ [funnelId]: newStep }, deleteKeyList);

    const newUrl = `${funnelQs.getOriginAndPathname()}${value}`;

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
