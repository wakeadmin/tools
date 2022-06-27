import { removeHeadingString } from '@wakeapp/utils';

/**
 * 链接路径和查询字符串
 * @param path
 * @param query
 * @returns
 */
export function joinQuery(path: string, query: string) {
  if (!query) {
    return path;
  }
  const hasQuery = path.includes('?');
  const trimQ = removeHeadingString(query, '?');

  return hasQuery ? `${path}&${trimQ}` : `${path}?${trimQ}`;
}

export function trimQuery(path: string) {
  const qIdx = path.indexOf('?');
  if (qIdx !== -1) {
    return path.substring(0, qIdx);
  }

  return path;
}

export function trimHash(path: string) {
  const hIdx = path.indexOf('#');
  if (hIdx !== -1) {
    return path.substring(0, hIdx);
  }

  return path;
}

export function trimQueryAndHash(path: string) {
  return trimQuery(trimHash(path));
}
