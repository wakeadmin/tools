import { injectable, Container, singleton, disposer, configureDI } from '..';

export const container = new Container();
let disposerStub: Function;
let createStub: Function;

@injectable()
export class Demo1 {
  constructor() {
    createStub?.();
  }

  @disposer()
  release() {
    disposerStub?.();
  }
}

@injectable()
export class Demo2 {
  constructor() {
    createStub?.();
  }

  @disposer()
  release() {
    disposerStub?.();
  }
}

@injectable()
@singleton()
export class DemoSingleton {
  constructor() {
    createStub?.();
  }
}

export const stubDisposer = (stub: Function) => {
  disposerStub = stub;
};

export const stubCreate = (stub: Function) => {
  createStub = stub;
};

declare global {
  interface DIMapper {
    Demo1: Demo1;
    Demo2: Demo2;
    DemoAll: {};
    DemoSingleton: DemoSingleton;
  }
}

export function cleanAndRebind() {
  container.unbindAll();

  configureDI(({ registerClass, registerSingletonClass }) => {
    registerClass('Demo1', Demo1);
    registerClass('Demo2', Demo2);
    registerClass('DemoAll', Demo1);
    registerClass('DemoAll', Demo2);
    registerSingletonClass('DemoSingleton', DemoSingleton);
  }, container);
}
