import qs from "qs";

const getOrigin = () => {
  if (typeof window === "undefined") return "";
  return window.location.origin;
};

const getPathName = () => {
  if (typeof window === "undefined") return "";
  return window.location.pathname;
};

const getQs = <T extends Record<string, unknown>>(): T => {
  if (typeof window === "undefined") return {} as T;

  const search = window.location.search;
  return qs.parse(search, { ignoreQueryPrefix: true }) as T;
};

const updateQs = <T extends Record<string, unknown>>(urlParams: T, params: Partial<T>): T => {
  const currentParams = { ...urlParams };

  // biome-ignore lint/complexity/noForEach: <explanation>
  Object.keys(params).forEach((key) => {
    //@ts-ignore
    currentParams[key] = params[key];
  });

  return currentParams;
};

// 특정 쿼리스트링을 삭제하는 함수
const deleteQs = <T extends Record<string, unknown>, U extends string>(urlParams: T, keys: U[]): Omit<T, U> => {
  const currentParams = { ...urlParams };

  // biome-ignore lint/complexity/noForEach: <explanation>
  keys.forEach((key) => {
    delete currentParams[key];
  });

  return currentParams;
};

const stringifyQs = (params: Record<string, unknown>): string => {
  return qs.stringify(params, { addQueryPrefix: true });
};

const updateFunnelQs = (param: Record<string, unknown>, deleteKey?: string[]): string => {
  const currentQueryParam = funnelQs.getQs();
  const updateQueryParam = funnelQs.updateQs(currentQueryParam, param);
  const deleteQueryParam = funnelQs.deleteQs(updateQueryParam, deleteKey ?? []);
  return funnelQs.stringifyQs(deleteQueryParam);
};

export const funnelQs = {
  getQs,
  updateQs,
  deleteQs,
  stringifyQs,
  getOrigin,
  getPathName,
  updateFunnelQs,
};
