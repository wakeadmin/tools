# wakeadmin babel 配置

- 支持 JSX
- 支持装饰器模式

# 安装

```shell
$ pnpm add babel-preset-wakeadmin -D
```

<br>

# vue-cli 配置

babel.config.js

```js
module.exports = {
  // 关闭 vue 自己的 JSX 插件
  presets: [['@vue/cli-plugin-babel/preset', { jsx: false }], 'babel-preset-wakeadmin'],
};
```

<br>

在 vue-cli 中 ts/tsx 文件会率先经过 ts-loader 转换，因此 tsconfig.json 也需要配置才行：

```diff
{
  "compilerOptions": {
    "target": "esnext",
    "module": "esnext",
    "strict": true,
+   // 支持 JSX, 不转换 JSX，让 babel 统一处理就行
+    "jsx": "preserve",
+    "jsxImportSource": "@wakeadmin/h",
    "moduleResolution": "node",
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "forceConsistentCasingInFileNames": true,
    "useDefineForClassFields": true,
    "sourceMap": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    },
    "lib": ["esnext", "dom", "dom.iterable", "scripthost"],
+   // 支持 装饰器语法
+    "experimentalDecorators": true,
+    "emitDecoratorMetadata": true,
+    // 支持 @wakeadmin/framework @observable 等语法
+    "useDefineForClassFields": true,
  },
  "include": ["src/**/*.ts", "src/**/*.tsx", "src/**/*.vue", "tests/**/*.ts", "tests/**/*.tsx"],
  "exclude": ["node_modules"]
}
```
