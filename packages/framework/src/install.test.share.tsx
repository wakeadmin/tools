import { getInject, injectable, page, disposer, Container, registerPageClass } from '.';
import { defineComponent } from '@wakeadmin/demi';

let createStub: Function;
let disposerStub: Function;

declare global {
  interface DIMapper {
    PAGE_SCOPE_TEST: PageScopeTest;
  }
}

@injectable()
@page()
export class PageScopeTest {
  constructor() {
    createStub?.();
  }

  @disposer()
  release() {
    disposerStub?.();
  }
}

export function registerPageScope() {
  const container = new Container();

  registerPageClass('PAGE_SCOPE_TEST', PageScopeTest, { container });

  const stub = (create: Function, dispose: Function) => {
    createStub = create;
    disposerStub = dispose;
  };

  return {
    container,
    isInstance(value: any) {
      return value instanceof PageScopeTest;
    },
    getInstance() {
      return getInject('PAGE_SCOPE_TEST', undefined, container);
    },
    stub,
  };
}

export async function testSuite(scheduler: { nextPage(): Promise<void> }) {
  const create = jest.fn();
  const dispose = jest.fn();

  const { stub, getInstance, isInstance } = registerPageScope();
  stub(create, dispose);

  // 创建
  const instance1 = getInstance();
  expect(isInstance(instance1)).toBeTruthy();
  expect(create).toBeCalledTimes(1);
  expect(dispose).toBeCalledTimes(0);

  // 重复请求应该返回同一个实例
  const instance2 = getInstance();
  expect(instance1 === instance2).toBeTruthy();
  expect(create).toBeCalledTimes(1);
  expect(dispose).toBeCalledTimes(0);

  // 跳转页面
  await scheduler.nextPage();

  // 自动清空
  expect(dispose).toBeCalledTimes(1);

  // 新的实例
  const instance3 = getInstance();
  expect(instance1).not.toBe(instance3);
}

export const NoopComponent = (name: string) =>
  defineComponent({
    name: 'Page',
    render() {
      return <div title="page">{name}</div>;
    },
  });
