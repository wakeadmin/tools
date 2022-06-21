import { hasProp, isPropertyKey } from './object';

test('hasProp', () => {
  const a = { foo: 'foo' };

  Object.setPrototypeOf(a, { baz: 'baz' });

  expect(hasProp(a, 'foo')).toBe(true);
  expect(hasProp(a, 'bar')).toBe(false);

  // @ts-expect-error
  expect(a.baz).toBe('baz');
  expect(hasProp(a, 'baz')).toBe(false);

  // class
  class A {
    foo = 'foo';
    fooMethod() {}

    get fooGetter() {
      return this.foo;
    }
  }

  class B extends A {
    bar = 'bar';
    barMethod() {}
    get barGetter() {
      return this.bar;
    }
  }

  const b = new B();
  expect(hasProp(b, 'bar')).toBe(true);

  // 属性都在 this 上
  expect(hasProp(b, 'foo')).toBe(true);

  // 方法和getter在原型上
  expect(hasProp(b, 'fooGetter')).toBe(false);
  expect(hasProp(b, 'barMethod')).toBe(false);
  expect(hasProp(b, 'fooMethod')).toBe(false);
  expect(hasProp(b, 'barGetter')).toBe(false);
});

test('isPropertyKey', () => {
  [1, 'foo', Symbol('foo')].forEach(key => {
    expect(isPropertyKey(key)).toBe(true);
  });
});
