import { shallowRef, reactive, shallowReactive } from 'vue-demi';

import { Annotation, AnnotationMaker, AnnotationType, IObservableFactory } from './types';
import { createAnnotationDecorator } from './decorators';

enum ObservableType {
  Deep = 'deep',
  Ref = 'ref',
  Shallow = 'shallow',
}

const createReactiveValue = (type: ObservableType, value: any) => {
  switch (type) {
    case ObservableType.Ref:
      return value;
    case ObservableType.Shallow:
      return shallowReactive(value);
    default:
      return reactive(value);
  }
};

const makeObservable: AnnotationMaker = (target, key, annotation, descriptor) => {
  if (process.env.NODE_ENV !== 'production' && !('value' in descriptor)) {
    throw new Error(`@observable 只能用于属性字段`);
  }

  const type = annotation.options.type as ObservableType;
  // 包装对象
  const initialValue = createReactiveValue(type, descriptor.value);
  // 让外部可以响应对象属性值设置的变化
  const value = shallowRef(initialValue);
  const getter = () => {
    return value.value;
  };

  const setter = (val: any) => {
    // 可能是一个全新的指
    value.value = createReactiveValue(type, val);
  };

  Object.defineProperty(target, key, {
    configurable: true,
    enumerable: true,
    get: getter,
    set: setter,
  });

  return value;
};

const createObservableAnnotation = (type: ObservableType): Annotation => {
  return {
    type: AnnotationType.Observable,
    options: {
      type,
    },
    make: makeObservable,
  };
};

const observableAnnotation = createObservableAnnotation(ObservableType.Deep);
const refAnnotation = createObservableAnnotation(ObservableType.Ref);
const shallowAnnotation = createObservableAnnotation(ObservableType.Shallow);

const observable: IObservableFactory = createAnnotationDecorator('observable', observableAnnotation) as any;

const ref = createAnnotationDecorator('observable.ref', refAnnotation);
const shallow = createAnnotationDecorator('observable.shallow', shallowAnnotation);

Object.assign(observable, { ref, shallow });

export { observable };
