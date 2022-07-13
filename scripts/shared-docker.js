// @ts-check
/**
 * 获取 host
 */
function getRegistryHost() {
  const server = process.env.DOCKER_SERVER;
  if (server) {
    if (server.startsWith('http')) {
      const url = new URL(server);
      return url.host;
    }
    return server;
  }

  return '';
}

module.exports.getRegistryHost = getRegistryHost;
