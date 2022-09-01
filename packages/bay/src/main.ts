import { createApp } from './configure';

const app = createApp();

app.mount();

Promise.resolve().then(() => {
  app.start();
});
