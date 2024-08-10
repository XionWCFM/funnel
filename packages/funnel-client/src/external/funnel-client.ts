import type { FunnelOptions, NonEmptyArray } from "@xionhub/funnel-core";
import type QueryString from "qs";
import qs from "qs";

export class FunnelClient<T extends NonEmptyArray<string>> {
  funnelId: string;
  steps: T;

  constructor(props: FunnelOptions<T>) {
    this.funnelId = props.funnelId;
    this.steps = props.steps;
  }

  createStep(value: T[number], context?: URLSearchParams, deleteQueryParams?: string[] | string) {
    const deleteList = (
      Array.isArray(deleteQueryParams) ? deleteQueryParams : [deleteQueryParams].filter(Boolean)
    ) as string[];
    const searchParamToObj = this.getQueryString(context ?? new URLSearchParams());
    return this.stringifyStep(this.deleteStep(this.createStepObject(value, searchParamToObj), deleteList));
  }

  getQueryString<T extends Record<string, unknown>>(searchParams: URLSearchParams) {
    const result = {} as Record<string, unknown>;
    searchParams.forEach((value, key) => {
      result[key] = value;
    });
    return result as T;
  }

  createStepObject(value: T[number], context?: Record<string, unknown>) {
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

  stringifyStep(context: Record<string, unknown>, options?: QueryString.IStringifyBaseOptions) {
    return qs.stringify(context, options);
  }

  parseQueryString<T>(queryString: string, options?: QueryString.IStringifyBaseOptions) {
    return qs.parse(queryString, options) as T;
  }
}
