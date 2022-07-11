// @ts-check
const fs = require('fs-extra');
const path = require('path');
const sass = require('sass');
const postcss = require('postcss').default;
const cssnano = require('cssnano');

if (!fs.existsSync('dist')) {
  fs.mkdirSync('dist');
}

const sources = [
  ['element-plus.scss', 'element-plus'],
  ['share.scss', 'share'],
  ['element-ui/index.scss', 'element-ui'],
];

const postcssProcessor = postcss([cssnano({ preset: 'default' })]);

sources.forEach(async ([source, target]) => {
  const input = path.join(__dirname, 'src', source);
  const output = path.join(__dirname, 'dist', `${target}.css`);

  console.log(`sass compile: ${input}`);

  const result = sass.compile(input, { sourceMap: false });
  if (!result.css) {
    return;
  }

  console.log(`compress: ${input}`);

  const postcssResult = await postcssProcessor.process(result.css, { map: false, from: input, to: output });
  await fs.writeFile(output, postcssResult.css);

  console.log(`done: ${input} -> ${output}`);
});

// 静态资源
fs.copySync('src/fonts', 'dist/fonts');
