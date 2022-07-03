import { LocaleMapper } from './types';

/**
 * locale 映射
 */

export function normalizeMapper(mapper?: LocaleMapper): (source: string) => string {
  if (typeof mapper === 'function') {
    return mapper;
  } else if (mapper == null) {
    return i => i;
  } else {
    const lowerCaseMapper = Object.keys(mapper).reduce<Record<string, string>>((prev, cur) => {
      prev[cur.toLowerCase()] = mapper[cur];
      return prev;
    }, {});

    return i => {
      const l = i.toLowerCase();
      if (l in lowerCaseMapper) {
        return lowerCaseMapper[l];
      }

      return i;
    };
  }
}
