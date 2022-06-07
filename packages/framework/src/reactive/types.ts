/**
 * @observable 类型定义
 */
export interface IObservableFactory extends PropertyDescriptor {
  /**
   * 只响应引用的变化，且不会深转换传入的值 -> 相当于 vue 的 shallowRef
   */
  ref: PropertyDecorator;

  /**
   * 浅转换 -> 相当于 vue 的 shallowReactive
   */
  shallow: PropertyDecorator;
}

/**
 * @computed 类型定义
 */
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IComputedFactory extends PropertyDescriptor {}
