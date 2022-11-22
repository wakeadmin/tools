/* eslint-disable vue/one-component-per-file */
import { isRef, unref, createApp } from 'vue';

import {
  DEFAULT_LOCALE_PERSIST_KEY,
  createI18n,
  getLocale,
  getGlobalInstance,
  getFallbackLocaleChain,
  getGlobalI18n,
  setLocale,
  registerBundles,
  I18nOptions,
  EVENT_LOCALE_CHANGE,
  EVENT_READY,
  EVENT_MESSAGE_CHANGE,
} from '.';
import { useI18n } from 'vue-i18n';

beforeEach(() => {
  window.localStorage.clear();
});

const suite = async (options: I18nOptions) => {
  test('基本属性', async () => {
    const instance = createI18n(options);
    expect(instance).toBeDefined();

    expect(getGlobalInstance()).toBe(instance);
    expect(getGlobalI18n()).toBe(instance.i18n);
    expect(getFallbackLocaleChain()).toEqual(['en-US', 'en', 'zh']);
    expect(getLocale()).toBe('en-US');

    const handleReady = jest.fn();
    instance.eventBus.on(EVENT_READY, handleReady);

    await Promise.resolve();
    expect(handleReady).toBeCalled();
  });

  test('设置 locale', () => {
    const instance = createI18n(options);
    const handleLocaleChange = jest.fn();
    instance.eventBus.on(EVENT_LOCALE_CHANGE, handleLocaleChange);

    const error = jest.spyOn(global.console, 'error');
    // 直接设置 locale 应该给出警告
    if (isRef(instance.i18n.locale)) {
      instance.i18n.locale.value = 'zh-CN';
    } else {
      instance.i18n.locale = 'zh-CN';
    }

    expect(handleLocaleChange).toBeCalledWith('zh-CN');

    expect(error).toBeCalledWith('[i18n] 禁止直接设置 .locale 来设置当前语言， 必须使用 setLocale()');

    // 通过 setLocale 设置
    setLocale('zh-cn');

    // 标识符映射
    expect(getLocale()).toBe('zh-cn');

    setLocale('zh-HK');
    expect(getLocale()).toBe('zh-Hant');
    // 持久化
    expect(window.localStorage.getItem(DEFAULT_LOCALE_PERSIST_KEY)).toBe('zh-Hant');
  });

  describe('注册语言包', () => {
    test('初始化语言包', async () => {
      const en = jest.fn(() => Promise.resolve({ hello: { a: '2', c: '3' } }));

      const defer = registerBundles({ en });
      const instance = createI18n({ ...options, messages: { en: { hello: { a: '1', b: '2' } } } });

      await defer;

      expect(unref(instance.i18n.messages)).toEqual({
        en: {
          hello: { a: '2', b: '2', c: '3' },
        },
      });
    });

    test('基础', async () => {
      const en = jest.fn(() => Promise.resolve({ hello: 'hello' }));
      const zh = jest.fn(() => Promise.resolve({ hello: '你好' }));
      const zhHant = { hello: '领厚' };

      const defer = registerBundles({
        en,
        zh,
        zhHant,
      });

      const instance = createI18n(options);

      await defer;

      expect(unref(instance.i18n.messages)).toEqual({
        en: {
          hello: 'hello',
        },
        'en-US': {},
        zh: {
          hello: '你好',
        },
      });

      // 切换语言
      instance.setLocale('zhHant');
      await new Promise(resolve => {
        instance.eventBus.once(EVENT_MESSAGE_CHANGE, resolve);
      });

      expect(unref(instance.i18n.messages)).toEqual({
        en: {
          hello: 'hello',
        },
        'en-US': {},
        zh: {
          hello: '你好',
        },
        // 按需加载
        zhHant: {
          hello: '领厚',
        },
      });

      // 只会加载一次
      expect(en).toBeCalledTimes(1);
      expect(zh).toBeCalledTimes(1);
    });
  });

  describe('缓存', () => {
    afterEach(() => {
      window.localStorage.clear();
    });

    test('缓存恢复', async () => {
      window.localStorage.setItem('i18n_keys', JSON.stringify(['en']));
      window.localStorage.setItem('i18n_en', JSON.stringify({ hello: 'helo' }));
      const en = jest.fn(() => Promise.resolve({ world: 'World' }));
      const instance = createI18n({ ...options, localCache: true });
      const defer = registerBundles({ en });

      await defer;
      expect(unref(instance.i18n.messages).en).toEqual({
        hello: 'helo',
        world: 'World',
      });

      // 设置缓存
      expect(window.localStorage.getItem('i18n_keys')).toBe('["en"]');
      expect(window.localStorage.getItem('i18n_en')).toBe('{"hello":"helo","world":"World"}');
    });
  });

  beforeEach(() => {
    document.body.innerHTML = '';
  });

  describe('test in vue', () => {
    // legacy 模式不支持传统 API
    if (options.legacy !== false) {
      test('legacy', () => {
        const i = createI18n({ ...options, messages: { en: { hello: 'world' } } });
        const app = createApp({
          template: `<p>{{$t('hello')}}</p>`,
        });
        app.use(i);
        app.mount('body');
        expect(document.body.outerHTML).toBe('<body data-v-app=""><p>world</p></body>');
      });
    }

    // legacy 为 true 时，底层也是 composition 模式，所以都支持
    test('composition', () => {
      const i = createI18n({ ...options, messages: { en: { hello: 'world' } } });
      const app = createApp({
        setup() {
          const { t } = useI18n();
          return { t };
        },
        template: `<p>{{t('hello')}}</p>`,
      });
      app.use(i);
      app.mount('body');
      expect(document.body.outerHTML).toBe('<body data-v-app=""><p>world</p></body>');
    });

    test('lazy composition', async () => {
      const bundle = () => Promise.resolve({ missing: '不见了' });
      const i = createI18n({ ...options, messages: { en: { hello: 'world' } } });
      const defer = i.registerBundles({ en: bundle });

      const app = createApp({
        setup() {
          const { t } = useI18n();
          return { t };
        },
        template: `<p>{{t('hello')}}[{{t('missing')}}]</p>`,
      });
      app.use(i);
      app.mount('body');
      expect(document.body.outerHTML).toBe('<body data-v-app=""><p>world[  ]</p></body>');

      await defer;
      expect(document.body.outerHTML).toBe('<body data-v-app=""><p>world[不见了]</p></body>');
    });
  });
};

describe('createI18n', () => {
  suite({ locale: 'en-US' });
});

describe('createI18n legacy=false', () => {
  suite({ legacy: false });
});
