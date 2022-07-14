/**
 * 容器构建
 */
// @ts-check
const build = require('../../../scripts/shared-docker-build');
const { getRegistryHost } = require('../../../scripts/shared-docker');

const pkg = require('../package.json');

const imageName = `wkfe/bay`;

const registryHost = getRegistryHost();
const HOST_PREFIX = registryHost ? `${registryHost}/` : '';

build(imageName, { HOST_PREFIX, VERSION: pkg.version, THEME: pkg.theme });
