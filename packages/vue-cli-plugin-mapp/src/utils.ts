import fs from 'fs';
import path from 'path';
import { camelCase } from '@wakeadmin/utils';

export type SharedDeclaration = { name: string; module: string } | string;
export interface PackageJSONLike {
  name: string;
  version: string;
}

/**
 * 从 package.json 中生成应用名称
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
 * 生成共享依赖入口文件
 */
export function generateShareEntryContent(shared: SharedDeclaration[]) {
  if (shared.length === 0) {
    return '';
  }

  const moduleSet = new Set();

  const list = shared.map((i, idx) => {
    const name = camelCase(typeof i === 'string' ? i : i.name);
    const module = typeof i === 'string' ? i : i.module;
    if (!name || !module) {
      throw new Error(`[vue-cli-plugin-mapp] shared name 或 module 不能为空`);
    }

    if (moduleSet.has(module)) {
      throw new Error(`[vue-cli-plugin-mapp] shared ${module} 不能重复`);
    }

    moduleSet.add(module);

    return [`import * as _${name}_${idx} from '${module}'`, `window.__mapp_shared_deps__['${name}'] = _${name}_${idx}`];
  });

  return [
    list.map(i => i[0]).join('\n'),
    '\n',
    'window.__mapp_shared_deps__ = {}',
    '\n',
    list.map(i => i[1]).join('\n'),
    '\n',
  ].join('');
}

/**
 * 生成分享入口文件
 */
export function generateShareEntry(target: string, shared: SharedDeclaration[]): void {
  if (shared.length === 0) {
    return;
  }

  const content = generateShareEntryContent(shared);
  const dir = path.dirname(target);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }

  fs.writeFileSync(target, content);
}
