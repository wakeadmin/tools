if (window.__MAPP_SERVICES__ == null) {
  throw new Error(`import '@wakeadmin/bay' 只有作为 bay 子应用时才能访问该模块`);
}

export default window.__MAPP_SERVICES__;
