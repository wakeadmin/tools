const fs = require('fs-extra');
const ch = require('child_process');

if (!fs.existsSync('dist')) {
  fs.mkdirSync('dist');
}

const args = '--no-source-map --style=compressed';

const sources = [
  ['element-plus.scss', 'element-plus'],
  ['share.scss', 'share'],
  ['element-ui/index.scss', 'element-ui'],
];

sources.forEach(([source, output]) => {
  const command = `pnpm sass src/${source}:dist/${output}.css ${args}`;
  console.log(command, '\n\n');
  ch.execSync(command, { stdio: 'inherit' });
});

fs.copySync('src/fonts', 'dist/fonts');
