// @ts-check
import fs from 'fs';
import path from 'path';
import svgo from 'svgo';
import glob from 'fast-glob';
import { camelCase, upperFirst } from 'lodash-es';
import { fileURLToPath } from 'url';
import prettier from 'prettier';

const dirname = path.dirname(fileURLToPath(import.meta.url));
const svgDir = path.join(dirname, '../svg/');
const list = await glob('**/*.svg', { cwd: svgDir });
const componentsDir = path.join(dirname, '../src/components/');

const compressed = await Promise.all(
  list.map(async i => {
    const data = await fs.promises.readFile(path.join(svgDir, i));
    const optimized = svgo.optimize(data, {
      path: i,
      js2svg: {
        pretty: true,
        indent: 2,
      },
      plugins: [
        'preset-default',
        'removeScriptElement',
        'removeDimensions',
        'removeXMLNS',
        {
          name: 'removeAttributesBySelector',
          params: {
            selector: 'svg',
            attributes: 'class',
          },
        },
        {
          name: 'removeAttributesBySelector',
          params: {
            selector: '[fill="currentColor"]',
            attributes: 'fill',
          },
        },
        {
          name: 'addClassesToSVGElement',
          params: {
            className: 'wk-svg',
          },
        },
      ],
    });

    if (optimized.error != null) {
      throw new Error(optimized.error);
    }

    return {
      path: i,
      optimized: optimized.data,
    };
  })
);

// clean
if (fs.existsSync(componentsDir)) {
  await fs.promises.rm(componentsDir, { recursive: true });
}

await fs.promises.mkdir(componentsDir);

// write

const modules = [];

const prettierConfig = { ...(await prettier.resolveConfig(process.cwd())), parser: 'typescript' };

await Promise.all(
  compressed.map(i => {
    const fileName = path.basename(i.path, '.svg');
    const componentName = upperFirst(camelCase(fileName));

    // 插入 fallThroughProps
    const svg = i.optimized.replace('<svg ', `<svg {...fallthroughProps} `);

    let content = `// 此文件自动生成，请勿编辑
/* eslint-disable @typescript-eslint/prefer-ts-expect-error */
import { SVGAttributes, isVue2, getCurrentInstance } from '@wakeadmin/demi';
import { declareComponent } from '@wakeadmin/h';

// eslint-disable-next-line spaced-comment
export const ${componentName} = /*#__PURE__*/ declareComponent<SVGAttributes>({
  name: 'WKSvg${componentName}',
  inheritAttrs: true,
  setup() {
    const vm = getCurrentInstance()?.proxy;
    return () => {
      let fallthroughProps: any;

      if (isVue2) {
        fallthroughProps = {
          // @ts-ignore
          on: vm?.$listeners,
        };
      }
      return (${svg});
    };
  },
});
`;

    content = prettier.format(content, prettierConfig);

    modules.push(componentName);
    const output = path.join(componentsDir, componentName + '.tsx');
    return fs.promises.writeFile(output, content);
  })
);

await fs.promises.writeFile(
  path.join(componentsDir, 'index.ts'),
  modules
    .map(i => {
      return `export * from './${i}'`;
    })
    .join('\n')
);
