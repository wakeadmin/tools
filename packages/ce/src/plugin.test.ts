import { createMatcher, getOptionsFromEnv, plugin } from './plugin';

test('getOptionsFromEnv', () => {
  expect(getOptionsFromEnv()).toBe(undefined);

  // @ts-expect-error
  globalThis.__CE_OPTIONS__ = '{ customElement: [/a/], mustUseProp: ["string"] }';
  expect(getOptionsFromEnv()).toEqual({ customElement: [/a/], mustUseProp: ['string'] });
  // @ts-expect-error
  globalThis.__CE_OPTIONS__ = undefined;
});

test('createMatcher', () => {
  const matcher = createMatcher([/wkc-/, 'hello-world']);

  expect(matcher('hello-world')).toBeTruthy();
  expect(matcher('wkc-hello')).toBeTruthy();

  expect(matcher('wkchello')).toBeFalsy();
});

describe('plugin', () => {
  test('vue2', () => {
    const app = {
      version: '2.6.0',
      config: {
        ignoredElements: ['hello-world'],
        mustUseProp: jest.fn((tag: string, type?: any, name?: string) => tag === 'hello-world'),
      },
    };

    (plugin as Function)(app as any, { customElement: /wkc-/, mustUseProp: /wkc-/ });
    expect(app.config.ignoredElements).toEqual(['hello-world', /wkc-/]);
    expect(app.config.mustUseProp('wkc-hello')).toBe(true);
    expect(app.config.mustUseProp('hello-world')).toBe(true);
    expect(app.config.mustUseProp('wkc-hello', 'text', 'class')).toBe(false);
  });

  // 暂时忽略
  test.skip('vue3', () => {
    const app = {
      version: '3.2.0',
      config: {
        compilerOptions: {
          isCustomElement: jest.fn((tag: string) => tag === 'hello-world'),
          mustUseProp: (tag: string, type?: any, name?: string) => false,
        },
      },
    };
    (plugin as Function)(app as any, { customElement: /wkc-/, mustUseProp: /wkc-/ });
    expect(app.config.compilerOptions.isCustomElement('hello-world')).toBe(true);
    expect(app.config.compilerOptions.isCustomElement('wkc-hello')).toBe(true);
    expect(app.config.compilerOptions.isCustomElement('hello')).toBe(false);

    expect(app.config.compilerOptions.mustUseProp('hello')).toBe(false);
    expect(app.config.compilerOptions.mustUseProp('wkc-hello')).toBe(true);
    expect(app.config.compilerOptions.mustUseProp('wkc-hello', 'text', 'class')).toBe(false);
  });
});
