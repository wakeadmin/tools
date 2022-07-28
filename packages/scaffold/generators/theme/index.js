import Generator from 'yeoman-generator';

import { isPnpmSupported, isYarnSupported } from '../app/utils.js';

const PNPM_SUPPORTED = isPnpmSupported();
const YARN_SUPPORTED = isYarnSupported();

export default class extends Generator {
  async prompting() {
    this.answers = await this.prompt([
      {
        type: 'input',
        name: 'name',
        message: '主题包名',
        default: 'wk-theme-demo',
      },
      { type: 'input', name: 'description', message: '主题包描述', default: '惟客云主题包' },
    ]);
  }

  writing() {
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
      this.spawnCommand('npm', ['install', '--legacy-peer-deps']);
    }
  }
}
