/**
 * 容器构建
 */
// @ts-check
const build = require('../../../scripts/shared-docker-build');
const { getRegistryHost } = require('../../../scripts/shared-docker');

const imageName = `wkfe/playground-vue2`;

const registryHost = getRegistryHost();
const HOST_PREFIX = registryHost ? `${registryHost}/` : '';

build(imageName, { HOST_PREFIX });
