/**
 * 编译 src 目录的 scss 文件
 */
// @ts-check
const fs = require('fs-extra');
const path = require('path');
const sass = require('sass');
const postcss = require('postcss').default;
const cssnano = require('cssnano');

const sourceDir = path.join(__dirname, '../src');
const distDir = path.join(__dirname, '../dist');

if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir);
} else {
  fs.emptyDirSync(distDir);
}

const inputs = fs.readdirSync(sourceDir).filter(i => i.endsWith('.scss') && !i.startsWith('_'));
const postcssProcessor = postcss([cssnano({ preset: 'default' })]);

inputs.forEach(async source => {
  const input = path.join(sourceDir, source);
  const output = path.join(distDir, `${path.basename(source, path.extname(source))}.css`);

  console.log(`sass compiling: ${input}`);

  const result = sass.compile(input, { sourceMap: false });

  if (!result.css) {
    return;
  }

  console.log(`compressing: ${input}`);

  const postcssResult = await postcssProcessor.process(result.css, { map: false, from: input, to: output });
  await fs.writeFile(output, postcssResult.css);

  console.log(`done: ${input} -> ${output}`);
});
