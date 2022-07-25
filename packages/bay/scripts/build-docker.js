/**
 * 容器构建
 */
// @ts-check
const build = require('../../../scripts/shared-docker-build');

const pkg = require('../package.json');

const imageName = `wkfe/bay`;

build(imageName, { VERSION: pkg.version, THEME: pkg.theme });
