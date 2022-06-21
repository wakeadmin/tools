export type ElementMatcher = string | RegExp | (string | RegExp)[];

export interface PluginOptions {
  /**
   * 是否为自定义组件
   */
  customElement: ElementMatcher;

  /**
   * 声明强制使用 domProp 元素
   */
  mustUseDomProp?: ElementMatcher;
}
