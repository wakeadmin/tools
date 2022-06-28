// @ts-check
import fs from 'fs';
import path from 'path';
import svgo from 'svgo';
import { camelCase, upperFirst } from 'lodash-es';
import { fileURLToPath } from 'url';

const dirname = path.dirname(fileURLToPath(import.meta.url));
const svgDir = path.join(dirname, '../svg');
const list = fs.readdirSync(svgDir).filter(i => i.endsWith('.svg'));
const componentsDir = path.join(dirname, '../src/components/');

const compressed = await Promise.all(
  list.map(async i => {
    const data = await fs.promises.readFile(path.join(svgDir, i));
    const optimized = svgo.optimize(data, { path: i });

    if (optimized.error != null) {
      throw new Error(optimized.error);
    }

    return {
      path: i,
      optimized: optimized.data,
    };
  })
);

const modules = [];

await Promise.all(
  compressed.map(i => {
    const fileName = path.basename(i.path, '.svg');
    const componentName = upperFirst(camelCase(fileName));
    const content = `// 此文件自动生成，请勿编辑
import { declareComponent, fallthrough, ExtraProps } from '@wakeadmin/h';
import { Icon } from '../Icon';

const SVG = '${i.optimized}'

export const ${componentName} = declareComponent<Omit<ExtraProps<typeof Icon>, 'icon'>>({
  setup(_, context) {
    return () => fallthrough(Icon, context, { icon: SVG });
  },
});
  `;

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
