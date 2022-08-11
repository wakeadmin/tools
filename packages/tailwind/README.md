## 如何使用

```shell
pnpm add  -D tailwindcss postcss autoprefixer @wakeadmin/tailwind
pnpx tailwindcss init -p
```

```js
// tailwind.config.js

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js}'],
  presets: [require('@wakeadmin/tailwind')],
};
```
