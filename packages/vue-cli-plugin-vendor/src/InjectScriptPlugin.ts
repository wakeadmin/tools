import HtmlWebpackPlugin from 'html-webpack-plugin';
import { Compiler, Compilation } from 'webpack';

const PLUGIN_NAME = 'InjectScriptPlugin';

export class InjectScriptPlugin {
  constructor(private scripts: string[]) {}

  apply(compiler: Compiler) {
    compiler.hooks.compilation.tap(PLUGIN_NAME, (compilation: Compilation) => {
      HtmlWebpackPlugin.getHooks(compilation).alterAssetTagGroups.tap(PLUGIN_NAME, (groups: any) => {
        groups.headTags.unshift(
          ...this.scripts.map(i => ({
            voidTag: false,
            tagName: 'script',
            meta: {
              plugin: PLUGIN_NAME,
            },
            attributes: {
              defer: true,
              src: i,
            },
          }))
        );

        return groups;
      });
    });
  }
}
