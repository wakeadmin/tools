// @ts-check
const ch = require('child_process');
const fs = require('fs-extra');
const template = require('lodash/template');

// 模板使用 {{}} 语法
const DockerfileTemplate = 'Dockerfile.tpl';

/**
 * 构建
 * @param {string} imageName
 * @param {Record<string, any>} [args]
 */
function build(imageName, args = {}, cwd = process.cwd()) {
  if (process.env.CI) {
    ch.execSync(`docker logout`, { stdio: 'inherit' });
  }

  const keys = Object.keys(args).filter(i => Boolean(args[i]));
  const buildArgs = keys.length ? keys.reduce((prev, k) => `${prev}  --build-arg '${k}=${args[k]}'`, '') : '';
  const hasTemplate = fs.existsSync(DockerfileTemplate);

  if (hasTemplate) {
    // 编译模板
    const compile = template(fs.readFileSync(DockerfileTemplate, 'utf-8'), { interpolate: /{{([\s\S]+?)}}/g });
    const content = compile(args);
    fs.writeFileSync('Dockerfile', content);
  }

  const cmd = `docker build -t ${imageName} ${buildArgs} .`;

  console.log(cmd);
  ch.execSync(cmd, { stdio: 'inherit', cwd });

  if (hasTemplate) {
    fs.removeSync('Dockerfile');
  }
}

module.exports = build;
