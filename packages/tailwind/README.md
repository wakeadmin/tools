## 如何使用

```shell
pnpm add  -D tailwindcss postcss autoprefixer @wakeadmin/tailwind
pnpx tailwindcss init
```

```js
// tailwind.config.js

const wakeadminTailwindConfig = require('@wakeadmin/tailwind');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js}'],
  ...wakeadminTailwindConfig,
};
```
