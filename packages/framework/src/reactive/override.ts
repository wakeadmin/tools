import { isPropertyKey, NOOP } from '../utils';

import { storeAnnotation } from './decorators';
import { Annotation, AnnotationType, IOverrideFactory } from './types';

const overrideAnnotation: Annotation = {
  type: AnnotationType.Override,
  make: NOOP,
};

/**
 * @override 装饰器
 * @param target
 * @param key
 */
export const override: IOverrideFactory = (target, key) => {
  if (process.env.NODE_ENV !== 'production' && (typeof target !== 'object' || !isPropertyKey(key))) {
    throw new Error('@override 只能用于属性装饰器');
  }

  storeAnnotation(target, key, overrideAnnotation);
};
