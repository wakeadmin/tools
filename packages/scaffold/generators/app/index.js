/* eslint-disable import/no-useless-path-segments */
import Generator from 'yeoman-generator';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import ThemeGenerator from '../theme/index.js';
import VueGenerator from '../vue/index.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default class extends Generator {
  async prompting() {
    const answers = await this.prompt([
      {
        type: 'list',
        name: 'type',
        message: '选择项目类型',
        choices: [
          {
            app: 'vue 子应用',
            value: 'vue-app',
          },
          {
            app: '主题包',
            value: 'theme',
          },
        ],
      },
    ]);

    switch (answers.type) {
      case 'vue-app':
        this.composeWith({ Generator: VueGenerator, path: path.join(__dirname, '../vue/index.js') });
        break;
      case 'theme':
        this.composeWith({ Generator: ThemeGenerator, path: path.join(__dirname, '../theme/index.js') });
        break;
      default:
        throw new Error(`unknown type: ${answers.type}`);
    }
  }
}
