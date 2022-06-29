import { addHeadingSlash, removeTrailingSlash } from '@wakeadmin/utils';

/**
 * 规范化路径
 * @param url
 * @returns
 */
export function normalizeUrl(url: string) {
  return addHeadingSlash(removeTrailingSlash(url));
}

/**
 * 去掉 base 前缀
 * @param baseUrl
 * @param path
 */
export function trimBaseUrl(baseUrl: string, path: string) {
  return normalizeUrl(normalizeUrl(path).replace(normalizeUrl(baseUrl), ''));
}
