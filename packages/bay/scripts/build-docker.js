/**
 * 容器构建
 */
// @ts-check
const path = require('path');
const fs = require('fs-extra');

const build = require('../../../scripts/shared-docker-build');
const pkg = require('../package.json');
const { IMAGE_NAME, PLAYGROUND_IMAGE_NAME } = require('./shared');

const THEME = pkg.theme;

// copy theme
const themeDir = path.join(path.dirname(require.resolve(path.posix.join(THEME, 'package.json'))), 'dist');
const themeTargetDir = path.join(__dirname, '../theme');

fs.ensureDirSync(themeTargetDir);
fs.emptyDirSync(themeTargetDir);
fs.copySync(themeDir, themeTargetDir);

build(IMAGE_NAME, { VERSION: pkg.version, THEME: pkg.theme, MOCK_ENABLED: false }, '--pull');
build(PLAYGROUND_IMAGE_NAME, { VERSION: pkg.version, THEME: pkg.theme, MOCK_ENABLED: true });
