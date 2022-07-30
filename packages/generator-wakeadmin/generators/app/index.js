/* eslint-disable import/no-useless-path-segments */
import Generator from 'yeoman-generator';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import ThemeGenerator from '../theme/index.js';
import VueAppGenerator from '../vue-app/index.js';
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
            name: 'vue 微前端子应用',
            value: 'vue-app',
          },
          {
            name: '主题包',
            value: 'theme',
          },
          {
            name: 'Vue 应用',
            value: 'vue',
          },
        ],
      },
    ]);

    switch (answers.type) {
      case 'vue-app':
        this.composeWith({ Generator: VueAppGenerator, path: path.join(__dirname, '../vue-app/index.js') });
        break;
      case 'theme':
        this.composeWith({ Generator: ThemeGenerator, path: path.join(__dirname, '../theme/index.js') });
        break;
      case 'vue':
        this.composeWith({ Generator: VueGenerator, path: path.join(__dirname, '../vue/index.js') });
        break;
      default:
        throw new Error(`unknown type: ${answers.type}`);
    }
  }
}
