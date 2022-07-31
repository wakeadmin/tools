/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { NormalizedUrl, RouteType } from './types';
import type { TreeNode } from './TreeNode';
import { addHeadingSlash, removeTrailingSlash, trimQuery, trimHash, trimQueryAndHash } from '@wakeadmin/utils';
import { getMicroAppContext } from './microAppContext';

const HAS_PROTOCOL = /^(http|https|file):\/\//;

export { trimQuery, trimHash, trimQueryAndHash };

/**
 * 根据深度降序排序节点列表
 * @param list
 * @returns
 */
export function sortByLevel(list: TreeNode[]) {
  return list.sort((a, b) => {
    return b.level - a.level;
  });
}

/**
 * 截断权限标识符
 * @param path
 * @param level
 */
export function truncateIdentifierPath(path: string, level: number) {
  return path.split('.').slice(0, level).join('.');
}

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

export function getQuery(url: string) {
  const qIdx = url.indexOf('?');
  if (qIdx !== -1) {
    const q = new URLSearchParams(url.slice(qIdx));
    return q;
  } else {
    return new URLSearchParams();
  }
}

/**
 * 合并路由
 * @param mode
 * @param parent
 * @param child
 * @returns
 */
export function combineRoute(mode: 'hash' | 'history', parent: string, child: string) {
  if (mode === 'hash') {
    return trimHash(parent) + '#' + child;
  } else {
    // 需要合并查询字符串, hash 则以 child 的为准
    parent = trimHash(parent);
    const parentQuery = getQuery(parent);
    parent = trimQuery(parent);

    const hIdx = child.indexOf('#');
    const childHashTrimed = trimHash(child);
    const childQuery = getQuery(childHashTrimed);

    // 合并 query
    for (const key of childQuery.keys()) {
      parentQuery.set(key, childQuery.get(key)!);
    }

    let url = removeTrailingSlash(parent) + addHeadingSlash(trimQuery(childHashTrimed));
    const query = parentQuery.toString();
    if (query) {
      url = url + '?' + query;
    }

    if (hIdx !== -1) {
      url += child.slice(hIdx);
    }

    return url;
  }
}

/**
 * 规范化惟客云后端配置的 url 地址
 * @param url
 * @param rootUrl 根节点 url, 下级 url 将于 root url 进行拼接。注意这里的 root 是最后一个包含 url 的节点。
 */
export function normalizeRoute(url: string, root?: string): NormalizedUrl {
  url = url.trim();
  const context = getMicroAppContext();

  // HTTP 外部链接
  if (HAS_PROTOCOL.test(url)) {
    return { raw: url, url, matchable: url, routeType: RouteType.Href };
  }

  // 外挂链接
  if (url.startsWith('@')) {
    const sliced = normalizeUrl(url.slice(1));
    return {
      raw: url,
      url: sliced,
      matchable: purifyUrl(sliced),
      routeType: RouteType.Outside,
    };
  }

  // 如果传入了根节点，将作为 hash 拼接起来
  if (root) {
    const historyMode = context?.routeMode === 'history';

    if (!historyMode && url.includes('#')) {
      throw new Error('url 不能携带 #');
    }

    const combined = normalizeUrl(combineRoute(historyMode ? 'history' : 'hash', root, url));

    return {
      raw: url,
      url: combined,
      matchable: purifyUrl(combined),
      routeType: RouteType.SubRoute,
    };
  }

  // 可能本身就是根节点
  const normalized = normalizeUrl(url);
  return {
    raw: url,
    url: normalized,
    matchable: purifyUrl(normalized),
    routeType: RouteType.Main,
  };
}
