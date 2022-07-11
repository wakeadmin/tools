import { camelCase } from '@wakeadmin/utils';
import { createHash } from 'crypto';

export type SharedDeclaration = { name: string; module: string } | string;
export interface PackageJSONLike {
  name: string;
  version: string;

  description?: string;
}

/**
 * 从 package.json 中获取应用名称
 * @param pkg
 * @returns
 */
export function getNameFromPackageJson(pkg: PackageJSONLike) {
  let name = pkg.name;
  if (name.startsWith('@')) {
    name = name.replace(/@(.*)\/(.*)/, '$1__$2');
  }

  return name;
}

/**
 * 根据名称自动映射获取端口, 从而实现端口号固定
 * @param {string} name
 */
export function getHashedPort(name: string) {
  const md5hash = createHash('md5');
  md5hash.update(name);
  const hash = md5hash.digest().readUInt32LE(0);
  return (hash % (65536 - 1024)) + 1024;
}

/**
 * 将 shared 转换为 webpack externals 配置
 */
export function transformSharedToExternal(shared: SharedDeclaration[]) {
  if (shared.length === 0) {
    return {};
  }

  const normalized = shared.map(i => (typeof i === 'string' ? { name: i, module: i } : i));

  return normalized.reduce<Record<string, string>>((prev, cur) => {
    const name = camelCase(cur.name);
    prev[cur.module] = `root window.__mapp_shared_deps__['${name}']`;

    return prev;
  }, {});
}
