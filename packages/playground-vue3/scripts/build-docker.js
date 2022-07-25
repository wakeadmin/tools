/**
 * 容器构建
 */
// @ts-check
const build = require('../../../scripts/shared-docker-build');

const imageName = `wkfe/playground-vue3`;

build(imageName, {});
