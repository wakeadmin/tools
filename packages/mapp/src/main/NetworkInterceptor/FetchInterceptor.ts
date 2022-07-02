import { InterceptRequest, InterceptResponse } from '../../types';
import { BaseInterceptor } from './BaseInterceptor';

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
            const response: InterceptResponse = {
              headers: result.headers,
              status: result.status,
              statusText: result.statusText,
              body: result.body,
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
