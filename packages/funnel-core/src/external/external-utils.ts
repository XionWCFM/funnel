import qs from "qs";
import type { FunnelOptions, NonEmptyArray } from "./types";

export const funnelOptions = <T extends NonEmptyArray<string>>(props: FunnelOptions<T>): FunnelOptions<T> => props;

export class FunnelClient<T extends NonEmptyArray<string>> {
  funnelId: string;
  steps: T;

  constructor(props: FunnelOptions<T>) {
    this.funnelId = props.funnelId;
    this.steps = props.steps;
  }

  getQueryString<T extends Record<string, unknown>>(searchParams: URLSearchParams) {
    const result = {} as Record<string, unknown>;
    searchParams.forEach((value, key) => {
      result[key] = value;
    });
    return result as T;
  }

  createStep(value: T[number], context?: Record<string, unknown>) {
    return { ...context, [this.funnelId]: value } as const;
  }

  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  deleteStep<T extends Record<string, any>, K extends keyof T>(obj: T, keys: K[]): Omit<T, K> {
    const result = { ...obj };

    for (const key of keys) {
      delete result[key];
    }

    return result as Omit<T, K>;
  }

  stringifyStep(context: Record<string, unknown>) {
    return qs.stringify(context, { addQueryPrefix: true });
  }

  parseQueryString<T>(queryString: string) {
    return qs.parse(queryString, { ignoreQueryPrefix: true }) as T;
  }
}
