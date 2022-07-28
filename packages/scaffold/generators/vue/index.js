import Generator from 'yeoman-generator';

export default class extends Generator {
  async prompting() {
    this.answers = await this.prompt([
      {
        type: 'list',
        name: 'type',
        message: 'Vue 版本',
        choices: ['vue2', 'vue3'],
      },
      { type: 'input', name: 'name', message: '项目名称', default: 'demo' },
    ]);
  }

  write() {
    const isVue2 = this.answers.type === 'vue2';

    if (isVue2) {
      this.addDependencies({
        vue: '^2.7.8',
        'vue-router': '^3.5.4',
      });
    } else {
      this.addDependencies({
        vue: '^3.2.37',
        'vue-router': '^4.1.2',
      });
      this.addDevDependencies({
        '@wakeadmin/vue-cli-plugin-ce': 'latest',
      });
    }

    this.fs.copyTpl(this.templatePath(), this.destinationPath(), this.answers);
  }
}
