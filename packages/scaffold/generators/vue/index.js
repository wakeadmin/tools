import Generator from 'yeoman-generator';
import path from 'node:path';

import { isPnpmSupported, isYarnSupported } from '../app/utils.js';

const PNPM_SUPPORTED = isPnpmSupported();
const YARN_SUPPORTED = isYarnSupported();

export default class extends Generator {
  async prompting() {
    this.answers = await this.prompt([
      {
        type: 'list',
        name: 'type',
        message: 'Vue 版本',
        choices: ['vue3', 'vue2'],
      },
      { type: 'input', name: 'name', message: '项目名称', default: 'demo' },
    ]);
  }

  writing() {
    const isVue2 = this.answers.type === 'vue2';

    if (isVue2) {
      this.addDependencies({
        vue: '^2.7.8',
        'vue-router': '^3.5.4',
        'element-ui': 'latest',
      });
    } else {
      this.addDependencies({
        vue: '^3.2.37',
        'vue-router': '^4.1.2',
        'element-plus': 'latest',
      });
      this.addDevDependencies({
        '@wakeadmin/vue-cli-plugin-ce': 'latest',
      });
    }

    if (PNPM_SUPPORTED) {
      this.packageJson.merge({
        scripts: {
          preinstall: 'npx only-allow pnpm',
        },
      });
    }

    this.fs.copyTpl(
      this.templatePath(),
      this.destinationPath(),
      this.answers,
      {},
      {
        globOptions: { dot: true },
        processDestinationPath: p => {
          const dir = path.dirname(p);
          let base = path.basename(p);

          if (base.startsWith('_')) {
            base = base.slice(1);
          }

          return path.join(dir, base);
        },
      }
    );
  }

  /**
   * 安装依赖
   */
  install() {
    this.spawnCommandSync('git', ['init']);

    if (PNPM_SUPPORTED) {
      this.spawnCommand('pnpm', ['install']);
    } else if (YARN_SUPPORTED) {
      this.spawnCommand('yarn', []);
    } else {
      this.spawnCommand('npm', ['install']);
    }
  }
}
