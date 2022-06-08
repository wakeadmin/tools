/* eslint-disable @typescript-eslint/no-empty-interface */
import { DebuggerOptions } from 'vue-demi';

/**
 * @observable 类型定义
 */
export interface IObservableFactory extends PropertyDecorator {
  /**
   * 只响应引用的变化，且不会深转换传入的值 -> 相当于 vue 的 shallowRef
   */
  ref: PropertyDecorator;

  /**
   * 浅转换 -> 相当于 vue 的 shallowReactive
   */
  shallow: PropertyDecorator;
}

export interface IComputedOptions extends DebuggerOptions {}

/**
 * @computed 类型定义
 */
export interface IComputedFactory extends PropertyDecorator {
  /**
   * @computed(options)
   */
  (options: IComputedOptions): PropertyDecorator;
}

/**
 * @override 类型定义
 */
export interface IOverrideFactory extends PropertyDecorator {}

export enum AnnotationType {
  Observable = 'observable',
  Computed = 'computed',
  Override = 'override',
}

/**
 * 注解生效器。返回转换为 vue 的数据结构
 */
export type AnnotationMaker = (
  target: any,
  key: PropertyKey,
  annotation: Annotation,
  descriptor: PropertyDescriptor
) => any;

/**
 * 注解定义
 */
export interface Annotation {
  /**
   * 注解的类型，比如 computed、observable、override
   */
  type: AnnotationType;

  /**
   * 注解选项
   */
  options?: any;

  /**
   * 生效器
   */
  make: AnnotationMaker;
}

export type AnnotationMap = Record<PropertyKey, Annotation>;
