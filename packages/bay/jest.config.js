module.exports = {
  preset: '@vue/cli-plugin-unit-jest/presets/typescript-and-babel',
  testMatch: ['**/*.(spec|test).[jt]s?(x)', '**/__tests__/*.[jt]s?(x)'],
  transformIgnorePatterns: ['/node_modules/(?!(.pnpm|@wakeapp)/)', '\\.pnp\\.[^\\/]+$'],
};
