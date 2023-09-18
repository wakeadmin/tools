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

export function toArray<T>(input: T): T extends any[] ? T : T[] {
  // @ts-expect-error
  return Array.isArray(input) ? input : [input];
}

export function runPromiseChain(this: any, chain: any[]): () => Promise<void> {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const that = this;
  return (...args) => chain.reduce((pre, cur) => pre.then(() => cur.apply(that, args)), Promise.resolve());
}
