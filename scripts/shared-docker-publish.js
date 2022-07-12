// @ts-check
const ch = require('child_process');

/**
 * @param {string} imageName
 * @param {string} version
 */
function publish(imageName, version) {
  const server = process.env.DOCKER_SERVER;
  const user = process.env.DOCKER_USER;
  const password = process.env.DOCKER_PASSWORD;
  const skipLogin = process.env.DOCKER_SKIP_LOGIN;
  const isCI = !!process.env.CI;

  if (isCI && !skipLogin) {
    ch.execSync(`docker login ${server || ''} -u ${user} -p '${password}'`, { stdio: 'inherit' });
  }

  // 设置版本
  ch.execSync(`docker tag ${imageName} ${imageName}:${version}`, { stdio: 'inherit' });

  // latest 版本
  ch.execSync(`docker push ${imageName}`, { stdio: 'inherit' });
  // 指定版本
  ch.execSync(`docker push ${imageName}:${version}`, { stdio: 'inherit' });

  // 清理
  ch.execSync(`docker image prune -f`, { stdio: 'inherit' });
}

module.exports = publish;
