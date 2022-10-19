import { singleton, injectable, inject, registerSingletonClass, getInject } from '.';

const idBase: any = 'a';
const idInjectByProperty: any = 'b';
// const idInjectByConstructor: any = 'b';

@injectable()
@singleton()
class Base {}

@injectable()
@singleton()
class InjectByProperty {
  @inject(idBase)
  a!: Base;
}

// ❌ babel decorator 插件不支持函数参数装饰，这不是 legacy 装饰器标准的一部分
// https://github.com/wycats/javascript-decorators/blob/e1bf8d41bfa2591d949dd3bbf013514c8904b913/README.md
// @injectable()
// @singleton()
// class InjectByConstructor {
//   a: Base;
//   constructor(@inject(idBase) base: Base) {
//     this.a = base;
//   }
// }

registerSingletonClass(idBase, Base);
registerSingletonClass(idInjectByProperty, InjectByProperty);
// registerSingletonClass(idInjectByConstructor, InjectByConstructor);

test('test inject', () => {
  const base = getInject(idBase);
  expect(base).toBeInstanceOf(Base);

  const injectByProperty = getInject(idInjectByProperty);
  expect(injectByProperty.a).toBe(base);

  // const injectByConstructor = getInject(idInjectByConstructor);
  // expect(injectByConstructor.a).toBe(base);
});
