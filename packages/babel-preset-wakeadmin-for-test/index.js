/* eslint-disable import/no-commonjs */
module.exports = () => ({
  presets: [['@babel/preset-env', { targets: { node: 'current' } }], '@babel/preset-typescript', '@babel/preset-react'],
  plugins: [
    'babel-plugin-transform-typescript-metadata',
    ['@babel/plugin-proposal-decorators', { legacy: true }],
    // 必须放在 plugin-proposal-decorators 之后
    ['@babel/plugin-proposal-class-properties'],
  ],
});
