const ch = require('child_process');
const uniq = require('lodash/uniq');
const { getRegistryHost } = require('./shared-docker');

/**
 *
 * @param {string} cmd
 */
function exec(cmd, inherit = true) {
  console.log(`$ ${cmd}`);
  return ch.execSync(cmd, { stdio: inherit ? 'inherit' : 'pipe' });
}

/**
 * 发布
 * @param {string} imageName
 * @param {string} version
 */
function publish(imageName, version) {
  const skipLogin = process.env.DOCKER_SKIP_LOGIN;
  const server = process.env.DOCKER_SERVER;
  const isCI = process.env.CI;
  const user = process.env.DOCKER_USER;
  const password = process.env.DOCKER_PASSWORD;
  const host = getRegistryHost(server);

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

  // 清理, 避免构建缓存
  exec(`docker image prune -f`)
  const list = uniq(
    exec(`docker images -q ${host && host + '/'}${imageName}:*`, false)
      .toString()
      .split(/\s+/)
      .map(i => i.trim())
      .filter(Boolean)
  );

  if (list.length) {
    exec(`docker rmi -f ${list.join(' ')}`);
  }
}

module.exports = publish;
