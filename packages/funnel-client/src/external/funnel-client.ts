import type { FunnelOptions, NonEmptyArray } from "@xionhub/funnel-core";
import type QueryString from "qs";
import qs from "qs";

type CreateStepOptionsType = {
  searchParams?: URLSearchParams;
  deleteQueryParams?: string[] | string;
  prefix?: string;
  qsOptions?: QueryString.IStringifyBaseOptions;
};

export class FunnelClient<T extends NonEmptyArray<string>> {
  funnelId: string;
  steps: T;
  defaultPrefix: string | undefined;
  defaultAddQueryPrefix: boolean | undefined;
  constructor(props: FunnelOptions<T>) {
    this.funnelId = props.funnelId;
    this.steps = props.steps;
    this.defaultPrefix = props?.defaultPrefix;
    this.defaultAddQueryPrefix = props?.defaultAddQueryPrefix;
    this.createStep = this.createStep.bind(this);
    this.getQueryString = this.getQueryString.bind(this);
    this.createStepObject = this.createStepObject.bind(this);
    this.deleteStep = this.deleteStep.bind(this);
    this.stringifyStep = this.stringifyStep.bind(this);
    this.parseQueryString = this.parseQueryString.bind(this);
  }

  createStep(step: T[number], options?: CreateStepOptionsType) {
    const { searchParams, deleteQueryParams, qsOptions, prefix } = options ?? {};
    const pathPrefix = prefix ?? this.defaultPrefix ?? "";
    const deleteList = (
      Array.isArray(deleteQueryParams) ? deleteQueryParams : [deleteQueryParams].filter(Boolean)
    ) as string[];
    const searchParamToObj = this.getQueryString(searchParams ?? new URLSearchParams());
    return `${pathPrefix}${this.stringifyStep(this.deleteStep(this.createStepObject(step, searchParamToObj), deleteList), qsOptions)}`;
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
    const addQueryPrefix = this.getAddQueryPrefixOptions(options?.addQueryPrefix);
    return qs.stringify(context, {
      ...options,
      addQueryPrefix,
    });
  }
  private getAddQueryPrefixOptions(options?: boolean | undefined) {
    if (typeof options === "boolean") {
      return options;
    }
    if (typeof this.defaultAddQueryPrefix === "boolean") {
      return this.defaultAddQueryPrefix;
    }
    // default options is true
    return true;
  }
  parseQueryString<T>(queryString: string, options?: QueryString.IStringifyBaseOptions) {
    return qs.parse(queryString, options) as T;
  }
}
