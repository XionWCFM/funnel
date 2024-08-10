import type { FunnelOptions, NonEmptyArray } from "./types";

export const funnelOptions = <T extends NonEmptyArray<string>>(props: FunnelOptions<T>): FunnelOptions<T> => props;
