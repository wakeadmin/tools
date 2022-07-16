/**
 * 静态资源注册
 *
 * 通常用于主题配置场景，比如默认头像、logo. 可以通过这个方法获取外部注入的静态资源链接
 */
declare global {
  /**
   * 声明资源，方便只能提示
   * 命名规范:
   *   TYPE_MODULE_NAME:
   *     TYPE: 类型，如 IMG、ICO、TXT,
   *     MODULE: 模块名称，如 BAY
   *     NAME: 资源命名
   */
  interface MappAssetKey {
    IMG_BAY_FAVICON: 'favicon';
    IMG_BAY_LOGO: 'logo';
    IMG_BAY_AVATAR: '头像';
    IMG_BAY_ERROR: '默认错误图片';
    IMG_BAY_ERROR_404: '默认 404 错误图片';
    IMG_BAY_ERROR_403: '默认 403 错误图片';
    TXT_BAY_FOOTER: '底部文本';
    TXT_BAY_404: '404 错误文本';
    TXT_BAY_403: '403 错误文本';

    URL_LOGIN: '登录页面';
  }
}

export * from '@wakeadmin/assets';
