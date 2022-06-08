import { addHiddenProp, hasProp } from '../utils';
import { Annotation, AnnotationMap, AnnotationType } from './types';

/**
 * 注解的保存位置
 */
export const storedAnnotationSymbol = Symbol('stored-annotation');

export const isOverridden = (annotation: Annotation): boolean => {
  return annotation.type === AnnotationType.Override;
};

export const getAnnotationType = (annotation: Annotation): string => {
  return annotation.type;
};

/**
 * 注解标记。
 * 注解的标记是静态的，即在类实例化之前，针对类的原型进行注解。
 */
export function storeAnnotation(prototype: any, key: PropertyKey, annotation: Annotation) {
  if (!hasProp(prototype, storedAnnotationSymbol)) {
    addHiddenProp(prototype, storedAnnotationSymbol, {
      // 继承父类定义的注解
      ...prototype[storedAnnotationSymbol],
    });
  }

  // 检查是否重复覆盖
  if (process.env.NODE_ENV !== 'production') {
    // 检查是否覆盖
    if (isOverridden(annotation) && !hasProp(prototype[storedAnnotationSymbol], key)) {
      const fieldName = `${prototype.constructor.name}.prototype.${key.toString()}`;
      throw new Error(`${fieldName} 使用了 @override, 但是当前类或父类未定义该字段`);
    }

    if (!isOverridden(annotation) && hasProp(prototype[storedAnnotationSymbol], key)) {
      const fieldName = `${prototype.constructor.name}.prototype.${key.toString()}`;
      const prevAnnotationType = getAnnotationType(prototype[storedAnnotationSymbol][key]);
      const currentAnnotationType = getAnnotationType(annotation);

      throw new Error(
        `不能对 ${fieldName} 使用 @${currentAnnotationType}，该字段已使用 @${prevAnnotationType} 注解，如果要覆盖父类字段请使用 @override 注解`
      );
    }
  }

  // @override 不处理
  if (!isOverridden(annotation)) {
    prototype[storedAnnotationSymbol][key] = annotation;
  }
}

/**
 * 删除注解
 * @param target
 * @param key
 */
export function removeAnnotation(target: any, key: PropertyKey) {
  delete target?.[storedAnnotationSymbol]?.[key];
}

/**
 * 获取注解
 * @param target
 * @returns
 */
export function collectAnnotations(target: any): AnnotationMap {
  if (!hasProp(target, storedAnnotationSymbol)) {
    if (process.env.NODE_ENV !== 'production' && !target[storedAnnotationSymbol]) {
      // 未进行任何注解
      throw new Error(`未进行任何注解，makeObservable 将不起作用`);
    }

    // 继承注解
    addHiddenProp(target, storedAnnotationSymbol, { ...target[storedAnnotationSymbol] });
  }

  return target[storedAnnotationSymbol];
}

/**
 * 创建装饰器
 * @param annotation
 * @returns
 */
export function createAnnotationDecorator(annotation: Annotation): PropertyDecorator {
  return (target, key) => {
    storeAnnotation(target, key, annotation);
  };
}
