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
import Vue from 'vue';
import VueI18n from 'vue-i18n';

Vue.use(VueI18n);

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

    // 直接设置 locale 应该给出警告

    expect(() => {
      instance.i18n.locale = 'zh-CN';
    }).toThrowError('[i18n] 禁止直接设置 .locale 来设置当前语言， 必须使用 setLocale()');

    // 通过 setLocale 设置
    setLocale('zh-cn');

    expect(handleLocaleChange).toBeCalledWith('zh');

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

      expect(instance.i18n.messages).toEqual({
        en: {
          hello: 'hello',
        },
        zh: {
          hello: '你好',
        },
      });

      // 切换语言
      instance.setLocale('zhHant');
      await Promise.resolve();

      expect(instance.i18n.messages).toEqual({
        en: {
          hello: 'hello',
        },
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

  test('render', () => {
    const { i18n } = createI18n({ ...options, messages: { en: { hello: 'world' } } });
    const app = new Vue({
      i18n,
      render(h) {
        return h('p', {}, this.$t('hello') as string);
      },
    });
    const root = document.createElement('div');
    document.body.appendChild(root);
    app.$mount(root);
    expect(document.body.outerHTML).toBe('<body><p>world</p></body>');
  });
};

describe('createI18n', () => {
  suite({ locale: 'en-US' });
});
