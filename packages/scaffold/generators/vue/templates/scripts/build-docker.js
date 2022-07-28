/**
 * 容器构建
 */
const { build } = require('@wakeadmin/docker-build');
const pkg = require('../package.json');

build(pkg.imageName, {});
