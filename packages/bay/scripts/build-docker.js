/**
 * 容器构建
 */
const ch = require('child_process');
const path = require('path');
const fs = require('fs-extra');
const template = require('lodash/template');

const pkg = require('../package.json');

const IMAGE_NAME = `wkfe/bay`;
const workDir = path.join(__dirname, '../docker');

fs.ensureDirSync(workDir);

process.chdir(workDir);

// 模板
const dockerfile = template(fs.readFileSync(path.join(__dirname, '../Dockerfile.tpl'), 'utf-8'))({
  version: pkg.version,
});

fs.writeFileSync(path.join(workDir, 'Dockerfile'), dockerfile);

// 退出登录，否则可能会报错
ch.execSync(`docker logout`, { stdio: 'inherit' });

ch.execSync(`docker build -t ${IMAGE_NAME} .`, {
  stdio: 'inherit',
});
