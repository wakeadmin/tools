// 将 theme.css 映射为 scss 变量，用于某些 只能使用scss 静态编译的场景
const fs = require('fs');
const path = require('path');

const content = fs.readFileSync(path.join(__dirname, './theme.css'), 'utf-8');

const REG = /^[ \t]*--(wk-.+?;)/gms;
const VAR_REG = /var\(--(.+?)\)/g;

const matched = content.match(REG);

fs.writeFileSync(
  path.join(__dirname, './theme.scss'),
  '/* 请勿编辑，此文件自动生成 */\n' +
    matched.map(i => i.trim().replace('--wk', '$wk').replace(VAR_REG, `$$$1`)).join('\n')
);
