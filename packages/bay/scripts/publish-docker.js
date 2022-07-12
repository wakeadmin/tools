const ch = require('child_process');
const pkg = require('../package.json');

const server = process.env.DOCKER_SERVER;
const user = process.env.DOCKER_USER;
const password = process.env.DOCKER_PASSWORD;
const skipLogin = process.env.DOCKER_SKIP_LOGIN;
const image = `wkfe/bay`;

if (!skipLogin) {
  ch.execSync(`docker login ${server || ''} -u ${user} -p '${password}'`, { stdio: 'inherit' });
}

// 设置版本
ch.execSync(`docker tag ${image} ${image}:${pkg.version}`, { stdio: 'inherit' });

// latest 版本
ch.execSync(`docker push ${image}`, { stdio: 'inherit' });
// 指定版本
ch.execSync(`docker push ${image}:${pkg.version}`, { stdio: 'inherit' });

// 清理
ch.execSync(`docker image prune -f`, { stdio: 'inherit' });
