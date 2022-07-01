/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { computed as vueComputed } from '@wakeadmin/demi';
import { isPlainObject, isPropertyKey, NOOP } from '../utils';

import { createAnnotationDecorator, storeAnnotation } from './decorators';
import { getEffectScope } from './effect-scope';
import { IComputedFactory, Annotation, AnnotationType, AnnotationMaker } from './types';

const makeComputed: AnnotationMaker = (target, key, annotation, descriptor) => {
  // 检查是否为 getter
  if (process.env.NODE_ENV !== 'production' && descriptor?.get == null) {
    throw new Error(`@computed 只能作用于 getter(+setter) 属性`);
  }

  const effectScope = getEffectScope(target);

  const value = effectScope.run(() =>
    vueComputed(
      {
        get: descriptor.get!.bind(target),
        set: descriptor.set?.bind(target) ?? NOOP,
      },
      annotation.options
    )
  )!;

  Object.defineProperty(target, key, {
    configurable: true,
    enumerable: false,
    get() {
      return value.value;
    },
    set: descriptor.set && (val => (value.value = val)),
  });

  return value;
};

const createComputedAnnotation = (options?: IComputedFactory): Annotation => {
  return {
    type: AnnotationType.Computed,
    options,
    make: makeComputed,
  };
};

const computedAnnotation = createComputedAnnotation();

/**
 * @computed 注解
 */
export const computed: IComputedFactory = ((targetOrOptions?: Object, maybePropertyKey?: PropertyKey) => {
  if (isPropertyKey(maybePropertyKey)) {
    // @computed
    return storeAnnotation(targetOrOptions, maybePropertyKey, computedAnnotation);
  }

  if (isPlainObject(targetOrOptions) || targetOrOptions == null) {
    // @computed(options) 形式
    return createAnnotationDecorator(
      'computed',
      createComputedAnnotation(targetOrOptions as IComputedFactory | undefined)
    );
  }

  throw new Error(`computed 只能作为装饰器使用`);
}) as any;
