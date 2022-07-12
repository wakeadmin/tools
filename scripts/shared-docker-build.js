// @ts-check
const ch = require('child_process');

/**
 * 构建
 * @param {string} imageName
 */
function build(imageName) {
  if (process.env.CI) {
    // CI 构建时退出，避免因为账号问题无法拉取
    ch.execSync(`docker logout`, { stdio: 'inherit' });
  }

  ch.execSync(`docker build -t ${imageName} .`, { stdio: 'inherit' });
}

module.exports = build;
