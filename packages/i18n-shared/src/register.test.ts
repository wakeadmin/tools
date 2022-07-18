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

  const waitRegistered = register.registerBundles({ en: enLoader, zh: zhLoader }, 11);
  // 优先级更高
  register.registerBundles({ zh: { me: '我' } }, 10);

  expect(zhLoader).not.toBeCalled();
  expect(enLoader).not.toBeCalled();

  // 下一个 tick 开始加载
  await Promise.resolve();

  expect(zhLoader).toBeCalled();

  // bundle 加载完毕
  await waitRegistered;
  expect(onChange).toBeCalled();
  expect(messages.zh.hello).toBe('你好');
  expect(messages.zh.me).toBe('我');
});
