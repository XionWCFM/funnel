import qs from "qs";

interface UrlParams {
  [key: string]: string | number | boolean | null | undefined;
}

const getOriginAndPathname = () => {
  if (typeof window === "undefined") return "";
  return `${window.location.origin}${window.location.pathname}`;
};

const getCurrentQueryParams = (): UrlParams => {
  if (typeof window === "undefined") return {};

  const search = window.location.search;
  return qs.parse(search, { ignoreQueryPrefix: true }) as UrlParams;
};

const updateQueryParams = (urlParams: UrlParams, params: UrlParams): UrlParams => {
  const currentParams = { ...urlParams };

  // biome-ignore lint/complexity/noForEach: <explanation>
  Object.keys(params).forEach((key) => {
    currentParams[key] = params[key];
  });

  return currentParams;
};

// 특정 쿼리스트링을 삭제하는 함수
const deleteQueryParams = (urlParams: UrlParams, keys: string[]): UrlParams => {
  const currentParams = { ...urlParams };

  // biome-ignore lint/complexity/noForEach: <explanation>
  keys.forEach((key) => {
    delete currentParams[key];
  });

  return currentParams;
};

const stringifyQueryParams = (params: UrlParams): string => {
  return qs.stringify(params, { addQueryPrefix: true });
};

const createQueryParamsResult = (param: UrlParams, deleteKey?: string[]): string => {
  const currentQueryParam = getCurrentQueryParams();
  const updateQueryParam = updateQueryParams(currentQueryParam, param);
  const deleteQueryParam = deleteQueryParams(updateQueryParam, deleteKey ?? []);
  return stringifyQueryParams(deleteQueryParam);
};

export const funnelQs = {
  getOriginAndPathname,
  getCurrentQueryParams,
  updateQueryParams,
  deleteQueryParams,
  stringifyQueryParams,
  createQueryParamsResult,
};
