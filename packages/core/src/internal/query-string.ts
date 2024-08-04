import qs from "qs";

interface UrlParams {
  [key: string]: string | number | boolean | null | undefined;
}

export const getOriginAndPathname = () => {
  if (typeof window === "undefined") return "";
  return `${window.location.origin}${window.location.pathname}`;
};

export const getCurrentQueryParams = (): UrlParams => {
  if (typeof window === "undefined") return {};

  const search = window.location.search;
  return qs.parse(search, { ignoreQueryPrefix: true }) as UrlParams;
};

export const updateQueryParams = (params: UrlParams): string => {
  if (typeof window === "undefined") return "";

  const currentParams = getCurrentQueryParams();

  // biome-ignore lint/complexity/noForEach: <explanation>
  Object.keys(params).forEach((key) => {
    currentParams[key] = params[key];
  });

  const newQueryString = qs.stringify(currentParams, { addQueryPrefix: true });
  return newQueryString;
};
// 특정 쿼리스트링을 삭제하는 함수
export const deleteQueryParams = (keys: string[]): string => {
  if (typeof window === "undefined") return "";

  const currentParams = getCurrentQueryParams();

  // biome-ignore lint/complexity/noForEach: <explanation>
  keys.forEach((key) => {
    delete currentParams[key];
  });

  const newQueryString = qs.stringify(currentParams, { addQueryPrefix: true });
  return newQueryString;
};
