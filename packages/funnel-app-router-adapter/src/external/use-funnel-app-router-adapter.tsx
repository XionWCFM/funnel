import {
  type CreateFunnelStepFunction,
  FunnelClient,
  type FunnelOptions,
  type FunnelStepChangeFunction,
  type NonEmptyArray,
  useCoreFunnel,
} from "@xionhub/funnel-core";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export const useFunnelAppRouterAdapter = <Steps extends NonEmptyArray<string>>(
  options: Omit<FunnelOptions<Steps>, "step">,
) => {
  const funnelId = options.funnelId;
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryStep = searchParams.get(funnelId);
  const funnelClient = new FunnelClient(options);
  const pathname = usePathname();
  const step = (queryStep ?? undefined) as Steps[number] | undefined;
  const [Funnel, controller] = useCoreFunnel({ ...options, step });

  const createFunnelStep: CreateFunnelStepFunction<Steps> = (step, options) => {
    if (!options?.searchParams) {
      return { [funnelId]: step };
    }
    const allQueryString = funnelClient.getQueryString(options?.searchParams);

    const deleteKeyList = Array.isArray(options?.deleteQueryParams)
      ? options?.deleteQueryParams
      : ([options?.deleteQueryParams].filter(Boolean) as string[]);

    const stepObject = funnelClient.createStepObject(step, funnelClient.deleteStep(allQueryString, deleteKeyList));
    return stepObject;
  };

  const onStepChange: FunnelStepChangeFunction<Steps> = (newStep, options) => {
    const stepObject = createFunnelStep(newStep, { ...options, searchParams });
    const newUrl = `${pathname}${funnelClient.stringifyStep(stepObject)}`;

    if (options?.type === "replace") {
      return router.replace(newUrl);
    }

    if (options?.type === "back") {
      return router.back();
    }

    return router.push(newUrl);
  };

  return [Funnel, { ...controller, onStepChange, createFunnelStep }] as const;
};
