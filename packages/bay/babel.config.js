module.exports =
  process.env.NODE_ENV === 'test'
    ? {
        presets: ['wakeadmin-for-test'],
      }
    : {
        presets: [['@vue/cli-plugin-babel/preset', { jsx: false }], 'babel-preset-wakeadmin'],
      };
