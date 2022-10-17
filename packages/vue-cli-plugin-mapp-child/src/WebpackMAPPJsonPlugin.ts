import { Compiler, Compilation, sources } from 'webpack';
import type { MicroApp } from '@wakeadmin/mapp-shared';

const PLUGIN_NAME = 'WebpackMAPPJsonPlugin';

/**
 * 输出 mapp.json 文件
 */
export class WebpackMAPPJsonPlugin {
  constructor(private mapp: MicroApp | MicroApp[]) {}

  apply(compile: Compiler) {
    compile.hooks.thisCompilation.tap(PLUGIN_NAME, (compilation: Compilation) => {
      compilation.hooks.processAssets.tap(
        { name: PLUGIN_NAME, stage: Compilation.PROCESS_ASSETS_STAGE_ADDITIONAL },
        (assets: any) => {
          assets['mapp.json'] = new sources.RawSource(JSON.stringify(this.mapp));
        }
      );
    });
  }
}
