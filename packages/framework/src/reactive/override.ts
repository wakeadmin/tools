import { NOOP } from '../utils';

import { createAnnotationDecorator } from './decorators';
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
export const override: IOverrideFactory = createAnnotationDecorator('override', overrideAnnotation);
