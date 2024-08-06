import { DEFAULT_FUNNEL_STEP_ID } from "./constant";
import type { FunnelOptions, NonEmptyArray } from "./types";

export const funnelOptions = <T extends NonEmptyArray<string>>(props: FunnelOptions<T>): FunnelOptions<T> => props;

export class FunnelClient<T extends NonEmptyArray<string>> {
  funnelId: string;
  steps: T;

  constructor(props: FunnelOptions<T>) {
    this.funnelId = props.funnelId ?? DEFAULT_FUNNEL_STEP_ID;
    this.steps = props.steps;
  }

  createFunnelStep(value: T[number]) {
    const funnelId = this.funnelId ?? DEFAULT_FUNNEL_STEP_ID;
    return `${funnelId}=${value}` as const;
  }
}
