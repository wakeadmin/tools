import { BundleRegister } from './register';

test('BundleRegister', async () => {
  const messages: Record<string, any> = {};
  const onChange = jest.fn();

  const register = new BundleRegister(
    (locale: string, bundle: any) => {
      messages[locale] = bundle;
    },
    () => ['zh-cn', 'zh'],
    onChange
  );

  const enLoader = jest.fn(() => Promise.resolve({ hello: 'Hello' }));
  const zhLoader = jest.fn(() => Promise.resolve({ hello: '你好', me: '就是我' }));
  const zhLazyLoader = jest.fn(() => Promise.resolve({ hello: '你好啊', you: '你' }));

  const waitRegistered = register.registerBundles({ en: enLoader, zh: zhLoader }, 11);
  // 优先级更高
  register.registerBundles({ zh: { me: '我' } }, 10);

  expect(register.hasPendingBundle()).toBe(true);

  expect(zhLoader).not.toBeCalled();
  expect(enLoader).not.toBeCalled();

  // 下一个 tick 开始加载
  await Promise.resolve();

  expect(zhLoader).toBeCalled();
  expect(enLoader).not.toBeCalled();

  // 加载的过程中继续插入语言包
  const waitZhLazyLoader = register.registerBundles({ zh: zhLazyLoader });

  // bundle 加载完毕
  await waitRegistered;

  // 又插入的新的语言包，这里依旧为 true
  expect(register.hasPendingBundle()).toBe(true);

  expect(onChange).toBeCalled();
  expect(messages.zh.hello).toBe('你好');
  expect(messages.zh.me).toBe('我');

  await waitZhLazyLoader;
  expect(messages.zh.you).toBe('你');
  expect(messages.zh.hello).toBe('你好啊');
  expect(register.hasPendingBundle()).toBe(false);
});
