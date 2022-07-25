/**
 * 容器构建
 */
// @ts-check
const build = require('../../../scripts/shared-docker-build');
const clean = require('../../../scripts/shared-docker-clean');

const pkg = require('../package.json');

const imageName = `wkfe/bay`;

// 强制清除，强制拉取最新的 wkfe/mapp 版本
clean(`wkfe/mapp`);
build(imageName, { VERSION: pkg.version, THEME: pkg.theme });
