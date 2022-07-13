// @ts-check
const ch = require('child_process');
const { getRegistryHost } = require('./shared-docker');

/**
 *
 * @param {string} cmd
 */
function exec(cmd) {
  console.log(`$ ${cmd}`);
  ch.execSync(cmd, { stdio: 'inherit' });
}

/**
 * 发布
 * @param {string} imageName
 * @param {string} version
 */
function publish(imageName, version) {
  const skipLogin = process.env.DOCKER_SKIP_LOGIN;
  const isCI = process.env.CI;
  const user = process.env.DOCKER_USER;
  const password = process.env.DOCKER_PASSWORD;
  const host = getRegistryHost();

  if (isCI && !skipLogin) {
    // 注意，如果是 http 可能导致登录失败，确保 host 在 insecure-registries 中
    exec(`docker login -u ${user} -p '${password}' ${host}`);
  }

  let latestTag = `${imageName}:latest`;
  let versionTag = `${imageName}:${version}`;

  if (host) {
    latestTag = `${host}/${latestTag}`;
    versionTag = `${host}/${versionTag}`;
  }

  // 设置版本
  exec(`docker tag ${imageName} ${latestTag}`);
  exec(`docker tag ${imageName} ${versionTag}`);

  // 发布
  exec(`docker push ${latestTag}`);
  exec(`docker push ${versionTag}`);

  // 清理
  exec(`docker image prune -f`);
}

module.exports = publish;
