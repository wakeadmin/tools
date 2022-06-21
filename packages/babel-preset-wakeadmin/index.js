/* eslint-disable import/no-commonjs */
module.exports = () => ({
  plugins: [
    // 支持标准 JSX 解析
    [
      '@babel/plugin-transform-react-jsx',
      {
        runtime: 'automatic',
        pragma: undefined,
        pragmaFrag: undefined,
        importSource: '@wakeadmin/h',
        throwIfNamespace: false,
      },
    ],
    'babel-plugin-transform-typescript-metadata',
    ['@babel/plugin-proposal-decorators', { legacy: true }],
    // 必须放在 plugin-proposal-decorators 之后
    ['@babel/plugin-proposal-class-properties'],
  ],
});
