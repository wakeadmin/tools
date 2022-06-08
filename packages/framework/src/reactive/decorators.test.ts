import { NOOP, ownKeys } from '../utils';

import { Annotation, AnnotationType } from './types';
import { collectAnnotations, storeAnnotation, storedAnnotationSymbol, isOverridden } from './decorators';

const MockAnnotation: Annotation = {
  type: AnnotationType.Observable,
  make: NOOP,
};

const MockOverrideAnnotation: Annotation = {
  type: AnnotationType.Override,
  make: NOOP,
};

test('isOverridden', () => {
  expect(isOverridden(MockAnnotation)).toBe(false);
  expect(isOverridden(MockOverrideAnnotation)).toBe(true);
});

describe('storeAnnotation', () => {
  test('auto create', () => {
    const target: any = {};

    storeAnnotation(target, 'foo', MockAnnotation);

    expect(target[storedAnnotationSymbol]).not.toBeNull();
    expect(target[storedAnnotationSymbol].foo).toBe(MockAnnotation);
  });

  test('extends prototype', () => {
    const parent: any = {};
    storeAnnotation(parent, 'foo', MockAnnotation);

    const child: any = {};
    Object.setPrototypeOf(child, parent);

    storeAnnotation(child, 'bar', MockAnnotation);

    // 继承父类的属性
    expect(ownKeys(child[storedAnnotationSymbol])).toEqual(['foo', 'bar']);
  });

  describe('override', () => {
    test('@override will be ignore', () => {
      const target: any = {};

      storeAnnotation(target, 'foo', MockAnnotation);

      // 将被忽略, 只是用来检查
      storeAnnotation(target, 'foo', MockOverrideAnnotation);
      expect(target[storedAnnotationSymbol].foo).toBe(MockAnnotation);
    });

    test('!override will throw if property undefined', () => {
      const target: any = {};
      expect(() => {
        storeAnnotation(target, 'foo', MockOverrideAnnotation);
      }).toThrowError('Object.prototype.foo 使用了 @override, 但是当前类或父类未定义该字段');
    });

    test('throw if override without @override', () => {
      const target: any = {};

      storeAnnotation(target, 'foo', MockAnnotation);

      expect(() => {
        storeAnnotation(target, 'foo', MockAnnotation);
      }).toThrowError(
        '不能对 Object.prototype.foo 使用 @observable，该字段已使用 @observable 注解，如果要覆盖父类字段请使用 @override 注解'
      );
    });
  });
});

test('collectAnnotations', () => {
  const target: any = {};

  storeAnnotation(target, 'foo', MockAnnotation);
  storeAnnotation(target, 'bar', MockAnnotation);

  expect(collectAnnotations(target)).toEqual({ foo: MockAnnotation, bar: MockAnnotation });
});
