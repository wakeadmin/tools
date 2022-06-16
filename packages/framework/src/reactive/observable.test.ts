/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-new */
/* eslint-disable no-magic-numbers */
import { isReactive, isShallow, watchEffect, isVue2 } from '@wakeadmin/demi';
import { collectAnnotations } from './decorators';
import { makeObservable } from './makeObservable';
import { observable } from './observable';
import { override } from './override';

const decorators = [observable, observable.ref, observable.shallow];

describe('注解', () => {
  test('注解应该能正常设置', () => {
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

  test('注解运行时检查', () => {
    class Getter {
      @observable
      get getter() {
        return 'test';
      }

      constructor() {
        makeObservable(this);
      }
    }

    expect(() => {
      new Getter();
    }).toThrowError('@observable 只能用于属性字段');

    class Method {
      @observable
      method() {}

      constructor() {
        makeObservable(this);
      }
    }

    expect(() => {
      new Method();
    }).toThrowError('@observable 只能用于属性字段');
  });

  test('继承', () => {
    class Base {
      @observable
      foo = 1;
    }

    expect(() => {
      // @ts-expect-error
      class Child extends Base {
        @observable
        override foo = 2;
      }
    }).toThrowError();

    expect(() => {
      // @ts-expect-error
      class Child extends Base {
        @override
        override foo = 2;
      }
    }).not.toThrowError();
  });
});

describe('observable 数据响应', () => {
  test('按照注解的类型使用不同的工厂方法转换', () => {
    class Base {
      @observable.ref
      ref = 1;

      @observable.shallow
      shallow = {};

      @observable
      deep = {};

      constructor() {
        makeObservable(this);
      }
    }

    const base = new Base();

    expect(isReactive(base.ref)).toBe(false);
    expect(isReactive(base.shallow)).toBe(true);
    expect(isReactive(base.deep)).toBe(true);
    if (!isVue2) {
      expect(isShallow(base.deep)).toBe(false);
      expect(isShallow(base.shallow)).toBe(true);
    }
  });

  test('字段重新赋值应该能够响应', () => {
    decorators.forEach(d => {
      class Base {
        @d
        count = 0;

        constructor() {
          makeObservable(this);
        }
      }

      let count = 0;
      const base = new Base();
      watchEffect(
        () => {
          count = base.count;
        },
        { flush: 'sync' }
      );

      // 设置新的值应该能响应
      base.count = 2;
      expect(count).toBe(2);
    });
  });

  test('observable 原始值, 赋值重新转换', () => {
    class Base {
      @observable.ref
      ref: any = 1;

      @observable.shallow
      shallow: any = 1;

      @observable
      deep: any = 2;

      constructor() {
        makeObservable(this);
      }
    }

    const base = new Base();
    expect(isReactive(base.ref)).toBe(false);
    expect(isReactive(base.shallow)).toBe(false);
    expect(isReactive(base.deep)).toBe(false);

    base.ref = {};
    base.shallow = { foo: 1 };
    base.deep = { bar: 1 };

    expect(isReactive(base.ref)).toBe(false);
    expect(isReactive(base.shallow)).toBe(true);
    expect(isReactive(base.deep)).toBe(true);

    if (!isVue2) {
      expect(isShallow(base.shallow)).toBe(true);
    }
  });

  test('observable.ref 响应测试', () => {
    class Ref {
      @observable.ref
      count = 1;

      constructor() {
        makeObservable(this);
      }
    }

    const ref = new Ref();
    let count = 0;

    watchEffect(
      () => {
        count = ref.count;
      },
      { flush: 'sync' }
    );

    expect(count).toBe(1);

    ref.count++;
    expect(count).toBe(2);
  });

  test('observable.shallow 响应测试', () => {
    class Shallow {
      @observable.shallow
      obj: any = { foo: 1, bar: { baz: 1 } };

      constructor() {
        makeObservable(this);
      }
    }

    let count = 0;
    const shallow = new Shallow();
    watchEffect(
      () => {
        JSON.stringify(shallow.obj);
        count++;
      },
      { flush: 'sync' }
    );

    expect(count).toBe(1);
    shallow.obj.foo++;
    expect(count).toBe(2);

    // 不会响应
    shallow.obj.bar.baz++;
    expect(count).toBe(2);
  });

  test('observable 响应测试', () => {
    class Deep {
      @observable
      obj: any = { foo: 1, bar: [1] };

      constructor() {
        makeObservable(this);
      }
    }

    let count = 0;
    const deep = new Deep();
    watchEffect(
      () => {
        JSON.stringify(deep.obj);
        count++;
      },
      { flush: 'sync' }
    );

    expect(count).toBe(1);
    deep.obj.foo++;
    expect(count).toBe(2);

    // 深度转换
    deep.obj.bar.push(1);
    expect(count).toBe(3);
  });
});
