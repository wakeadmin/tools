/**
 * 容器构建
 */
// @ts-check
const build = require('../../../scripts/shared-docker-build');

const pkg = require('../package.json');

const { IMAGE_NAME, PLAYGROUND_IMAGE_NAME } = require('./shared');

build(IMAGE_NAME, { VERSION: pkg.version, THEME: pkg.theme, MOCK_ENABLED: false }, '--pull');
build(PLAYGROUND_IMAGE_NAME, { VERSION: pkg.version, THEME: pkg.theme, MOCK_ENABLED: true });
