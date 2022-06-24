import { NormalizedUrl } from './types';
import { addHeadingSlash, removeTrailingSlash } from '@wakeadmin/utils';

const HAS_PROTOCOL = /^(http|https|file):\/\//;

export function splitIdentifierPath(path: string): string[] {
  return path
    .split('.')
    .map(i => i.trim())
    .filter(Boolean);
}

/**
 * 非空字符串
 * @param str
 * @returns
 */
export function noEmptyString(str?: string): str is string {
  return str != null && str.trim() !== '';
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

/**
 * 逐级裁剪路径, 如果无法继续裁剪，将返回 null
 *
 * @param url 这里假设传入的是规范化后的 url
 * @returns
 */
export function trimPathSection(url: string): string | null {
  let [path, hash = ''] = url.split('#');
  const hashLastIndex = hash.lastIndexOf('/');

  if (hashLastIndex >= 0 && hash !== '/') {
    // 可以裁剪
    hash = hash.slice(0, hashLastIndex);

    return `${path}#${hash || '/'}`;
  }

  const pathLastIndex = path.lastIndexOf('/');

  if (pathLastIndex >= 0 && path !== '/') {
    path = path.slice(0, pathLastIndex);

    return `${path || '/'}#${hash || '/'}`;
  }

  // 无法继续裁剪
  return null;
}

/**
 * 规范化 url，去掉干扰因素，方便进行匹配
 *
 * 一定会携带 hash
 * @param url
 */
export function purifyUrl(url: string) {
  let [path, hash = ''] = url.split('#');
  path = trimQuery(path);
  hash = trimQuery(hash);

  path = addHeadingSlash(removeTrailingSlash(path));

  if (hash) {
    hash = addHeadingSlash(removeTrailingSlash(hash));
  } else {
    // 默认 hash 为 '/'
    hash = '/';
  }

  return `${path}#${hash}`;
}

/**
 * 规范化路径
 * @param url
 */
export function normalizeUrl(url: string) {
  let [path, hash] = url.split('#');
  const normalize = (p: string) => {
    const qIdx = p.indexOf('?');
    if (qIdx !== -1) {
      return addHeadingSlash(removeTrailingSlash(p.slice(0, qIdx))) + p.slice(qIdx);
    } else {
      return addHeadingSlash(removeTrailingSlash(p));
    }
  };

  return `${normalize(path)}${hash ? '#' + normalize(hash) : ''}`;
}

/**
 * 规范化惟客云后端配置的 url 地址
 * @param url
 * @param rootUrl 根节点 url, 下级 url 将于 root url 进行拼接。注意这里的 root 是最后一个包含 url 的节点。
 */
export function normalizeRoute(url: string, root?: string): NormalizedUrl {
  url = url.trim();

  // HTTP 外部链接
  if (HAS_PROTOCOL.test(url)) {
    return { raw: url, url, matchable: url };
  }

  // 外挂链接
  if (url.startsWith('@')) {
    const sliced = normalizeUrl(url.slice(1));
    return {
      raw: url,
      url: sliced,
      matchable: purifyUrl(sliced),
    };
  }

  if (url.includes('#')) {
    throw new Error('url 不能携带 #');
  }

  // 如果传入了根节点，将作为 hash 拼接起来
  if (root) {
    const combined = normalizeUrl(trimHash(root) + '#' + url);

    return {
      raw: url,
      url: combined,
      matchable: purifyUrl(combined),
    };
  }

  // 可能本身就是根节点
  const normalized = normalizeUrl(url);
  return {
    raw: url,
    url: normalized,
    matchable: purifyUrl(normalized),
  };
}
