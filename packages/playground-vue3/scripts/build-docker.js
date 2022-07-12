/**
 * 容器构建
 */
const path = require('path');
const build = require('../../../scripts/shared-docker-build');

const imageName = `wkfe/playground-vue3`;
const workDir = path.join(__dirname, '../');

process.chdir(workDir);

build(imageName);
