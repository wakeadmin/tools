/* eslint-disable no-magic-numbers */
import { collectAnnotations } from './decorators';
import { observable } from './observable';

describe('注解', () => {
  test('注解应该能正常设置', () => {
    const decorators = [observable, observable.ref, observable.shallow];

    // 必须用于属性注解
    decorators.forEach(d => {
      expect(() => {
        // @ts-expect-error
        d();
      }).toThrowError();
    });

    class Test {
      @observable
      a: number = 1;

      @observable.ref
      // @ts-expect-error
      b: number;

      @observable.shallow
      c = {};
    }

    expect(Object.keys(collectAnnotations(Test.prototype))).toEqual(['a', 'b', 'c']);
    expect(Object.values(collectAnnotations(Test.prototype)).map(i => i.options?.type)).toEqual([
      'deep',
      'ref',
      'shallow',
    ]);
  });

  test('注解运行时检查', () => {});
});

describe('observable 数据响应', () => {
  test('按照注解的类型使用不同的工厂方法转换', () => {});

  test('字段重新赋值应该能够响应', () => {});

  test('字段重新赋值应该重新转换', () => {});

  test('observable.ref 响应测试', () => {});

  test('observable.shallow 响应测试', () => {});

  test('observable 响应测试', () => {});
});
