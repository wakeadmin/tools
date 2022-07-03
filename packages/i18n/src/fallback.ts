/* eslint-disable @typescript-eslint/no-use-before-define */
// 此文件从 https://github.dev/intlify/vue-i18n-next/blob/dab6db19a1ef917425939275a41dfde9b6c61fe9/packages/core-base/src/fallbacker.ts#L1
// 移植
import { isString, isArray, isBoolean, isPlainObject } from '@wakeadmin/utils';
import { DEFAULT_LOCALE } from '@wakeadmin/i18n-shared';

import type { Locale, FallbackLocale } from 'vue-i18n';

/**
 * Fallback with locale chain
 *
 * @remarks
 * A fallback locale function implemented with a fallback chain algorithm. It's used in VueI18n as default.
 *
 * @param fallback - A {@link FallbackLocale | fallback locale}
 * @param start - A starting {@link Locale | locale}
 *
 * @returns Fallback locales
 *
 * @VueI18nSee [Fallbacking](../guide/essentials/fallback)
 *
 * @VueI18nGeneral
 */
export function fallbackWithLocaleChain<Message = string>(ctx: any, fallback: FallbackLocale, start: Locale): Locale[] {
  const startLocale = isString(start) ? start : DEFAULT_LOCALE;
  const context = ctx;

  if (!context.__localeChainCache) {
    context.__localeChainCache = new Map();
  }

  let chain = context.__localeChainCache.get(startLocale);
  if (!chain) {
    chain = [];

    // first block defined by start
    let block: unknown = [start];

    // while any intervening block found
    while (isArray(block)) {
      block = appendBlockToChain(chain, block, fallback);
    }

    // prettier-ignore
    // last block defined by default
    const defaults = isArray(fallback) || !isPlainObject(fallback)
      ? fallback
      : fallback.default
        ? fallback.default
        : null

    // convert defaults to array
    block = isString(defaults) ? [defaults] : defaults;
    if (isArray(block)) {
      appendBlockToChain(chain, block, false);
    }
    context.__localeChainCache.set(startLocale, chain);
  }

  return chain;
}

function appendBlockToChain(chain: Locale[], block: Locale[], blocks: FallbackLocale): unknown {
  let follow: unknown = true;
  for (let i = 0; i < block.length && isBoolean(follow); i++) {
    const locale = block[i];
    if (isString(locale)) {
      follow = appendLocaleToChain(chain, block[i], blocks);
    }
  }
  return follow;
}

function appendLocaleToChain(chain: Locale[], locale: Locale, blocks: FallbackLocale): unknown {
  let follow: unknown;
  const tokens = locale.split('-');
  do {
    const target = tokens.join('-');
    follow = appendItemToChain(chain, target, blocks);
    tokens.splice(-1, 1);
  } while (tokens.length && follow === true);
  return follow;
}

function appendItemToChain(chain: Locale[], target: Locale, blocks: FallbackLocale): unknown {
  let follow: unknown = false;
  if (!chain.includes(target)) {
    follow = true;
    if (target) {
      follow = target[target.length - 1] !== '!';
      const locale = target.replace(/!/g, '');
      chain.push(locale);
      if (
        (isArray(blocks) || isPlainObject(blocks)) &&
        (blocks as any)[locale] // eslint-disable-line @typescript-eslint/no-explicit-any
      ) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        follow = (blocks as any)[locale];
      }
    }
  }
  return follow;
}
