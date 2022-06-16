/* eslint-disable no-magic-numbers */
/* eslint-disable no-new */
/* eslint-disable @typescript-eslint/no-empty-function */
import { ref, isVue2 } from '@wakeadmin/demi';
import { computed } from './computed';
import { collectAnnotations } from './decorators';
import { makeObservable } from './makeObservable';
import { override } from './override';

describe('computed annotation', () => {
  test('throw if unexpected use', () => {
    expect(() => {
      // @ts-expect-error
      computed('test');
    }).toThrowError('computed 只能作为装饰器使用');
  });

  test('storeAnnotation', () => {
    class Target {
      @computed
      get foo() {
        return '';
      }

      set foo(value) {}

      @computed({ onTrack: () => {} })
      get bar() {
        return '';
      }
    }

    const instance = new Target();
    const annotations = collectAnnotations(instance);
    expect(Object.keys(annotations)).toEqual(['foo', 'bar']);
    expect(annotations.foo.type).toBe('computed');
    expect(annotations.bar.type).toBe('computed');
    expect(annotations.bar.options).not.toBeUndefined();
  });

  test('@computed subclass 覆盖', () => {
    class Base {
      @computed
      get foo() {
        return '';
      }
    }

    expect(() => {
      // @ts-expect-error
      class Child extends Base {
        @computed
        override get foo() {
          return '';
        }
      }
    }).toThrowError(
      '不能对 Child.prototype.foo 使用 @computed，该字段已使用 @computed 注解，如果要覆盖父类字段请使用 @override 注解'
    );

    // its ok @override
    expect(() => {
      // @ts-expect-error
      class Child extends Base {
        @override
        override get foo() {
          return '';
        }
      }
    }).not.toThrowError();
  });
});

describe('computed observable', () => {
  test('异常情况', () => {
    class Target {
      @computed
      foo = 'foo';

      constructor() {
        makeObservable(this);
      }
    }

    expect(() => {
      new Target();
    }).toThrowError('@computed 只能作用于 getter(+setter) 属性');

    class Target2 {
      @computed({})
      foo = 'foo';

      constructor() {
        makeObservable(this);
      }
    }

    expect(() => {
      new Target2();
    }).toThrowError('@computed 只能作用于 getter(+setter) 属性');
  });

  // TODO：
  test('非响应式模式 setter 和 getter 可能无法正常使用', () => {
    class Target {
      _foo = 1;

      @computed
      get foo() {
        return this._foo;
      }

      set foo(val: number) {
        this._foo = val;
      }

      constructor() {
        makeObservable(this);
      }
    }

    const target = new Target();
    expect(target.foo).toBe(1);
    target.foo = 2;

    // 注意，computed 在 vue 中有缓存，因为 _foo 不是响应式数据，所以这里不会变动
    expect(target.foo).toBe(1);
  });

  test('响应数据变化', () => {
    const count = ref(0);

    class Base {
      @computed
      get count() {
        return count.value;
      }

      set count(value: number) {
        count.value = value;
      }

      constructor() {
        makeObservable(this);
      }
    }

    const base = new Base();
    expect(base.count).toBe(0);
    count.value++;
    expect(base.count).toBe(1);
    base.count++;
    expect(base.count).toBe(2);
    expect(count.value).toBe(2);

    // extends
    class Child extends Base {
      @override
      override get count() {
        return super.count * 2;
      }

      constructor() {
        super();
        makeObservable(this);
      }
    }

    const child = new Child();
    expect(child.count).toBe(4);
    count.value = 4;
    expect(child.count).toBe(8);
  });

  // vue2 暂时不支持这些参数
  if (!isVue2) {
    test('参数设置', () => {
      const count = ref(0);
      const trigger = jest.fn();
      class Base {
        @computed({ onTrigger: trigger })
        get count() {
          return count.value;
        }

        constructor() {
          makeObservable(this);
        }
      }

      const base = new Base();
      expect(base.count).toBe(0);

      count.value = 1;
      expect(trigger).toBeCalled();
    });
  }
});
