import { hasProp, addHiddenProp, getDescriptor } from '../utils';
import { collectAnnotations, getAnnotationType, removeAnnotation } from './decorators';

import { Annotation } from './types';

export const administratorStoreSymbol = Symbol('stored-admin');

export const getAdministrator = (
  target: any
): Record<
  PropertyKey,
  {
    raw: any;
    annotation: Annotation;
  }
> => {
  if (!hasProp(target, administratorStoreSymbol)) {
    addHiddenProp(target, administratorStoreSymbol, {});
  }

  return target[administratorStoreSymbol];
};

export function apply(target: any, key: PropertyKey, annotation: Annotation) {
  const admin = getAdministrator(target);

  // 检查是否 make 过
  if (process.env.NODE_ENV !== 'production' && hasProp(admin, key)) {
    const fieldName = `${target.constructor.name}.prototype.${key.toString()}`;
    const prevAnnotationType = getAnnotationType(admin[key].annotation);
    const currentAnnotationType = getAnnotationType(annotation);

    throw new Error(
      `${fieldName} 重复定义，该字段已使用 @${prevAnnotationType} 注解，当前重新使用 @${currentAnnotationType} 注解, 如果要覆盖父类字段请配合使用 @override 声明`
    );
  }

  if (!(key in target)) {
    if (key in collectAnnotations(target)) {
      // 属性可能还未定义，比如在子类中初始化的属性，这里延后处理即可
      return;
    } else {
      const fieldName = `${target.constructor.name}.prototype.${key.toString()}`;
      const annotationType = getAnnotationType(annotation);
      throw new Error(`${fieldName} @${annotationType} 注解无法生效：字段未定义`);
    }
  }

  // 继承场景：这里的 descriptor 是从子类往父类查找的，因此支持子类覆盖
  // 但是仅限于那些会添加到 prototype 的属性，比如 computed
  // 普通字段是无法覆盖的, 比如 observable
  // 因此，子类和父类在注解上面必须保持统一
  const descriptor = getDescriptor(target, key);

  if (descriptor == null) {
    const fieldName = `${target.constructor.name}.prototype.${key.toString()}`;
    throw new Error(`${fieldName} 无法获取到 descriptor`);
  }

  const value = annotation.make(target, key, annotation, descriptor);

  admin[key] = {
    raw: value,
    annotation,
  };

  // 删除掉已经处理的注解，避免子类重复处理
  // 类继承的场景要注意一些限制： https://mobx.js.org/subclassing.html
  removeAnnotation(target, key);
}
