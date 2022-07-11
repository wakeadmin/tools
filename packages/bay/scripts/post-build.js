/**
 * 资源拷贝
 */
const fs = require('fs-extra');
const path = require('path');

const pkg = require('../package.json');

const dockerWorkspace = path.join(__dirname, '../docker');
const dist = path.join(__dirname, '../dist');

fs.copy(dist, path.join(dockerWorkspace, '__entry__'));

// 主题拷贝
const theme = pkg.theme;

if (theme) {
  const themePath = require.resolve(`${theme}/package.json`);
  const themeOut = path.join(path.dirname(themePath), 'dist');

  fs.copy(themeOut, path.join(dockerWorkspace, '__theme__'));
}
