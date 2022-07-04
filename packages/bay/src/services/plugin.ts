import CEPlugin from '@wakeadmin/ce';

/**
 * Vue 插件
 * @param app
 */
export function install(app: any) {
  app.use(CEPlugin, { customElement: /wkc-/ });
}
