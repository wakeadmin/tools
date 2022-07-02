import { concurrently } from '@wakeadmin/utils';

import { InterceptRequest, InterceptResponse } from '../../types';

import { BaseInterceptor } from './BaseInterceptor';
import { isJSONResponse } from './utils';

export class FetchInterceptor extends BaseInterceptor {
  attach() {
    window.fetch = this.intercept(window.fetch);
  }

  private intercept(originFetch: typeof fetch): typeof fetch {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const that = this;

    return function (input, init) {
      let url: string;
      let request: Request | undefined;
      let requestInit: RequestInit | undefined;
      let headers: Headers | undefined;
      let method: string | undefined;
      let body: any | undefined;

      if (typeof input === 'string') {
        url = input;
      } else if (input instanceof URL) {
        url = input.href;
      } else {
        request = input;
        url = input.url;
      }

      if (init) {
        requestInit = init;
      }

      // init 的优先级会高于 request
      headers = requestInit?.headers ? new Headers(requestInit.headers) : request?.headers ?? new Headers();
      method = requestInit?.method ?? request?.method ?? 'GET';
      body = requestInit?.body ?? request?.body ?? null;

      // request 是只读的，不允许拦截修改
      const _request: InterceptRequest = {
        url,
        method,
        headers,
        body,
        raw: {
          type: 'fetch',
          input,
          init,
        },
      };

      if (process.env.NODE_ENV !== 'production') {
        Object.freeze(_request);
      }

      return new Promise((resolve, reject) => {
        that.apply(_request, async () => {
          try {
            const result = await originFetch(input, { ...init, headers: _request.headers });

            const clone = result.clone();
            let jsonCache: any;

            const response: InterceptResponse = {
              headers: result.headers,
              status: result.status,
              statusText: result.statusText,
              body: result.body,
              raw: {
                type: 'fetch',
                response: result,
              },
              json: concurrently(async () => {
                if (!isJSONResponse(result.headers)) {
                  return null;
                }

                try {
                  // json() 方法只能调用一次, 因此这里使用缓存
                  if (jsonCache !== undefined) {
                    return jsonCache;
                  }
                  return (jsonCache = await clone.json());
                } catch (err) {
                  console.debug(`[mapp] failed to get json from fetch`, response, err);
                  return null;
                }
              }),
            };

            resolve(result);

            return response;
          } catch (err) {
            reject(err);
            throw err;
          }
        });
      });
    };
  }
}
