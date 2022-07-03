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
    expect(getGlobalI18n()).toBe(instance.instance);
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
    if (isRef(instance.instance.locale)) {
      instance.instance.locale.value = 'zh-CN';
    } else {
      instance.instance.locale = 'zh-CN';
    }

    expect(handleLocaleChange).toBeCalledWith('zh-CN');

    expect(error).toBeCalledWith('[i18n] 禁止直接设置 .locale 来设置当前语言， 必须使用 setLocale()');

    // 通过 setLocale 设置
    setLocale('zh-cn');

    // 标识符映射
    expect(getLocale()).toBe('zh');
    // 持久化
    expect(window.localStorage.getItem(DEFAULT_LOCALE_PERSIST_KEY)).toBe('zh');
  });

  describe('注册语言包', () => {
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

      expect(unref(instance.instance.messages)).toEqual({
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
      await Promise.resolve();

      expect(unref(instance.instance.messages)).toEqual({
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
        template: `<p>{{t('hello')}}</p>`,
        setup() {
          const { t } = useI18n();
          return { t };
        },
      });
      app.use(i);
      app.mount('body');
      expect(document.body.outerHTML).toBe('<body data-v-app=""><p>world</p></body>');
    });
  });
};

describe('createI18n', () => {
  suite({ locale: 'en-US' });
});

describe('createI18n legacy=false', () => {
  suite({ legacy: false });
});
