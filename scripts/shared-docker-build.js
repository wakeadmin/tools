// @ts-check
const ch = require('child_process');

/**
 * 构建
 * @param {string} imageName
 * @param {Record<string, any>} [args]
 */
function build(imageName, args = {}) {
  if (process.env.CI) {
    ch.execSync(`docker logout`, { stdio: 'inherit' });
  }

  const keys = Object.keys(args).filter(i => Boolean(args[i]));
  const buildArgs = keys.length ? keys.reduce((prev, k) => `${prev}  --build-arg ${k}=${args[k]}`, '') : '';
  const cmd = `docker build -t ${imageName} ${buildArgs} .`;

  console.log(cmd);
  ch.execSync(cmd, { stdio: 'inherit' });
}

module.exports = build;
