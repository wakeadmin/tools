/**
 * 容器构建
 */
// @ts-check
const path = require('path');
const fs = require('fs-extra');
const template = require('lodash/template');
const build = require('../../../scripts/shared-docker-build');
const { getRegistryHost } = require('../../../scripts/shared-docker');

const pkg = require('../package.json');

const imageName = `wkfe/bay`;
const workDir = path.join(__dirname, '../docker');

fs.ensureDirSync(workDir);

process.chdir(workDir);

// 模板
const dockerfile = template(fs.readFileSync(path.join(__dirname, '../Dockerfile.tpl'), 'utf-8'))({
  version: pkg.version,
});

fs.writeFileSync(path.join(workDir, 'Dockerfile'), dockerfile);

const registryHost = getRegistryHost();
const HOST_PREFIX = registryHost ? `${registryHost}/` : '';

build(imageName, { HOST_PREFIX });
