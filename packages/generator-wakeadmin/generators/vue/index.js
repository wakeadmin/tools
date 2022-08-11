import Generator from 'yeoman-generator';
import path from 'node:path';

import { PNPM_SUPPORTED, PACKAGE_MANAGER_NAME } from '../app/utils.js';

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
        'vue-i18n': '8.*',
        '@wakeadmin/i18n-legacy': 'latest',
      });
    } else {
      this.addDependencies({
        vue: '^3.2.37',
        'vue-router': '^4.1.2',
        'element-plus': 'latest',
        'vue-i18n': '9.*',
        '@wakeadmin/i18n': 'latest',
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
    if (!this.fs.exists(this.destinationPath('node_modules'))) {
      this.spawnCommandSync(PACKAGE_MANAGER_NAME, ['install']);
    }

    if (!this.fs.exists(this.destinationPath('.git'))) {
      this.spawnCommandSync('git', ['init']);

      this.spawnCommandSync('git', ['add', '.']);
      this.spawnCommandSync('git', ['commit', '-m', 'chore: initial project', '--no-verify']);
    }
  }

  end() {
    const dir = path.relative(process.cwd(), this.destinationRoot());
    const m = PACKAGE_MANAGER_NAME;

    this.log(`应用创建成功!

$ cd ${dir}
${m} run serve        # 本地开发
${m} run build        # 生成构建
${m} run build:docker # Docker 容器构建

参考：https://wakeadmin.wakedata.com/standard/build.html 搭建 Jenkins 自动化检查、发布、部署
`);
  }
}
