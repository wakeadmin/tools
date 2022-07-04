import { ServicePlugin } from '@vue/cli-service';

const TRANSLATE_FILE_REG = /([^./]*)\.tr$/;

function getLocale(request: string) {
  return request.match(TRANSLATE_FILE_REG)?.[1];
}

/**
 * *.tr 翻译文件识别
 */
export const plugin: ServicePlugin = (api, options) => {
  api.chainWebpack(chain => {
    // JSON 识别 tr 文件
    chain.module.rule('translate').test(/\.tr$/).use('json').loader('json-loader').end();

    // 翻译文件资源合并, 避免碎片化, 导致并发请求数量过多
    if (process.env.NODE_ENV === 'production') {
      const splitChunks = chain.optimization.get('splitChunks');
      if (splitChunks == null) {
        // 已禁用
        return;
      }

      const translateMerge = {
        chunks: 'async',
        test: /\.tr$/,
        maxSize: 500 * 1024, // 500kb
        name: (module: { rawRequest: string }) => {
          const request = module.rawRequest;
          if (request == null) {
            throw new Error(`[vue-cli-plugin-i18n]: failed to get locale from ${request}`);
          }

          return `${getLocale(request)}-tr`;
        },
        enforce: true,
      };

      chain.optimization.splitChunks({
        ...splitChunks,
        cacheGroups: {
          ...splitChunks.cacheGroups,
          translateMerge,
        },
      });
    }
  });
};

export default plugin;
