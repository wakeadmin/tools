/* eslint-disable no-lone-blocks */
// 将 theme.css 映射为 scss 变量，用于某些 只能使用scss 静态编译的场景
const fs = require('fs');
const path = require('path');

{
  // 生成 theme.scss
  const theme = fs.readFileSync(path.join(__dirname, './theme.css'), 'utf-8');

  const REG = /^[ \t]*--(wk-.+?;)/gms;
  const VAR_REG = /var\(--(.+?)\)/g;

  const matched = theme.match(REG);

  fs.writeFileSync(
    path.join(__dirname, './theme.scss'),
    '/* 请勿编辑，此文件自动生成 */\n' +
      matched.map(i => i.trim().replace('--wk', '$wk').replace(VAR_REG, `$$$1`)).join('\n')
  );
}

{
  // 生成自定义命名空间的 element-plus.css
  const theme = fs.readFileSync(path.join(__dirname, './adapter/element-plus.css'), 'utf-8');

  fs.writeFileSync(
    path.join(__dirname, './adapter/element-plus-ep.css'),
    '/* 请勿编辑，此文件自动生成 */\n' + theme.replace(/--el-/gm, '--ep-')
  );
}
