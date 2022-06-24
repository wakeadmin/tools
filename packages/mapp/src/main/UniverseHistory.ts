import { shallowReactive, computed, watch } from 'vue';
import { NoopObject, queryString, Disposer } from '@wakeadmin/utils';

import { UniverseLocation } from '../types';

interface RawLocation {
  href: string;
  path: string;
  query: string;
  hash: string;
}

const HASH_URL_REGEXP = /#(\/.*)(\?.*)?/;

export class UniverseHistory {
  /**
   * 原始 location，用于比对
   */
  private rawLocation: RawLocation;

  private query = computed(() => {
    return queryString.parse(this.rawLocation.query);
  });

  private hashLocation = computed<{ path: string; query: string }>(() => {
    const hash = this.rawLocation.hash ?? '';
    if (hash.startsWith('#/')) {
      const matched = hash.match(HASH_URL_REGEXP);
      if (matched) {
        return {
          path: matched[1],
          query: matched[2],
        };
      }
    }

    return {
      path: '/',
      query: '',
    };
  });

  private hashQuery = computed(() => {
    const { query } = this.hashLocation.value;

    return !query ? NoopObject : queryString.parse(query);
  });

  private reactiveLocation = computed<UniverseLocation>(() => {
    return {
      href: this.rawLocation.href,
      path: this.rawLocation.path,
      query: this.query.value,
      hashPath: this.hashLocation.value.path,
      hashQuery: this.hashQuery.value,
    };
  });

  private released = false;

  private onLocationChange?: (location: UniverseLocation) => void;

  private disposer = new Disposer();

  get location(): UniverseLocation {
    return this.reactiveLocation.value;
  }

  constructor(onLocationChange?: (location: UniverseLocation) => void) {
    this.rawLocation = shallowReactive(this.getRawLocation());
    this.onLocationChange = onLocationChange;

    this.initial();
  }

  release() {
    if (this.released) {
      return;
    }

    this.released = true;

    window.removeEventListener('popstate', this.handleRouteUpdate);
    window.removeEventListener('hashchange', this.handleRouteUpdate);

    this.disposer.release();
  }

  private initial() {
    window.addEventListener('popstate', this.handleRouteUpdate);
    window.addEventListener('hashchange', this.handleRouteUpdate);

    // popstate 只有用户点击浏览器前进和后退时才会触发, 因此这里会进行拦截
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const that = this;
    const patch = (originFn: Function) =>
      function (this: any) {
        const rtn = originFn.apply(this, arguments);

        if (!that.released) {
          that.handleRouteUpdate();
        }

        return rtn;
      };
    window.history.pushState = patch(window.history.pushState);
    window.history.replaceState = patch(window.history.replaceState);

    if (this.onLocationChange) {
      const stop = watch(
        this.reactiveLocation,
        v => {
          this.onLocationChange?.(v);
        },
        { immediate: true }
      );
      this.disposer.push(stop);
    }
  }

  private handleRouteUpdate = () => {
    const location = this.getRawLocation();

    Object.assign(this.rawLocation, location);
  };

  private getRawLocation() {
    const { href, pathname, search, hash } = window.location;

    return {
      href,
      path: pathname,
      query: search,
      hash,
    };
  }
}
