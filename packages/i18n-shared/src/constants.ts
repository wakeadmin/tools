import { LocaleMapper, NumberFormats, DateTimeFormats } from './types';

/**
 * 语言变动
 */
export const EVENT_LOCALE_CHANGE = 'EVENT_LOCALE_CHANGE';

/**
 * 语言包变动
 */
export const EVENT_MESSAGE_CHANGE = 'EVENT_MESSAGE_CHANGE';

/**
 * 实例已创建
 */
export const EVENT_READY = 'EVENT_READY';

/**
 * 默认语言
 */
export const DEFAULT_LOCALE = 'zh';

/**
 * 默认语言映射
 */
export const DEFAULT_MAPPER: LocaleMapper = {
  'zh-CN': 'zh',
  'zh-TW': 'zh-Hant',
  'zh-HK': 'zh-Hant',
  'zh-MO': 'zh-Hant',
};

/**
 * 默认时间格式
 */
export const DEFAULT_DATETIME_FORMATS: DateTimeFormats = {
  en: {
    short: {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    },
    mid: {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hourCycle: 'h23',
    },
    long: {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      // hour12: false,
      hourCycle: 'h23',
    },
    timeZone: {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hourCycle: 'h23',
      timeZoneName: 'short',
    },
  },
  zh: {
    short: {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    },
    mid: {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hourCycle: 'h23',
    },
    long: {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hourCycle: 'h23',
    },
    timeZone: {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hourCycle: 'h23',
      timeZoneName: 'short',
    },
  },
  'zh-Hant': {
    short: {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    },
    mid: {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hourCycle: 'h23',
    },
    long: {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hourCycle: 'h23',
    },
    timeZone: {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hourCycle: 'h23',
      timeZoneName: 'short',
    },
  },
  th: {
    short: {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    },
    mid: {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hourCycle: 'h23',
    },
    long: {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hourCycle: 'h23',
    },
    timeZone: {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hourCycle: 'h23',
      timeZoneName: 'short',
    },
  },
};

/**
 * 默认数字格式
 */
export const DEFAULT_NUMBER_FORMATS: NumberFormats = {
  en: {
    currency: {
      style: 'currency',
      currency: 'USD',
    },
    meterUnit: {
      style: 'unit',
      unit: 'meter',
      unitDisplay: 'long',
    },
  },
  zh: {
    currency: {
      style: 'currency',
      currency: 'CNY',
    },
    meterUnit: {
      style: 'unit',
      unit: 'meter',
      unitDisplay: 'long',
    },
  },
  'zh-Hant': {
    currency: {
      style: 'currency',
      currency: 'CNY',
    },
    meterUnit: {
      style: 'unit',
      unit: 'meter',
      unitDisplay: 'long',
    },
  },
  th: {
    currency: {
      style: 'currency',
      currency: 'THB',
    },
    meterUnit: {
      style: 'unit',
      unit: 'meter',
      unitDisplay: 'long',
    },
  },
};
