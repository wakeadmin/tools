/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { NoopArray } from '@wakeadmin/utils';

import { InterceptRequest, InterceptResponse } from '../../types';

import { BaseInterceptor } from './BaseInterceptor';
import { isJSONResponse } from './utils';

export enum AJAXState {
  UNSENT = 0,
  OPENED,
  HEADERS_RECEIVED,
  LOADING,
  DONE,
}

/**
 * 解析字符串 Headers
 * @param headersInString
 * @returns
 */
export function parseHeaders(headersInString: string) {
  const arr = headersInString.trim().split(/[\r\n]+/);
  const headers = new Headers();

  arr
    .filter(i => Boolean(i.trim()))
    .forEach(item => {
      const parts = item.split(': ');
      const key = parts.shift();
      const value = parts.join(': ');
      headers.set(key!, value);
    });

  return headers;
}

export class AJAXInterceptor extends BaseInterceptor {
  attach() {
    const XHR = window.XMLHttpRequest;
    const originOpen = XHR.prototype.open;
    const originSend = XHR.prototype.send;
    const originSetRequestHeader = XHR.prototype.setRequestHeader;
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const that = this;

    XHR.prototype.open = function () {
      if (that.isIntercepted) {
        // @ts-expect-error 记录参数
        this.__intercept_open = Array.from(arguments);
      }

      return originOpen.apply(this, arguments as any);
    };

    XHR.prototype.setRequestHeader = function (name, value) {
      if (that.isIntercepted) {
        // @ts-expect-error 记录参数
        const headers: Headers = (this.__intercept_headers ??= new Headers());
        // setRequestHeader 等价于 append
        headers.append(name, value);
      } else {
        originSetRequestHeader.apply(this, arguments as any);
      }
    };

    XHR.prototype.send = function (body) {
      const args = arguments as any;
      // eslint-disable-next-line @typescript-eslint/no-this-alias
      const xhr = this;

      if (that.isIntercepted) {
        // @ts-expect-error
        const [method = 'GET', url = '/', _, user, password] = (xhr.__intercept_open ?? NoopArray) as Parameters<
          typeof originOpen
        >;

        const _url = new URL(url, document.baseURI);
        if (user != null || password != null) {
          _url.username = user!;
          _url.password = password!;
        }

        // @ts-expect-error __intercept_headers 为扩展对象
        const headers: Headers = xhr.__intercept_headers ?? new Headers(); // 拷贝一份，避免循环

        const request: InterceptRequest = {
          url: _url.href,
          method,
          headers,
          body,
          raw: {
            type: 'ajax',
            xhr,
          },
        };

        if (process.env.NODE_ENV !== 'production') {
          Object.freeze(request);
        }

        let completed = false;

        that.apply(request, () => {
          // 监听事件
          return new Promise((resolve, reject) => {
            const _resolve = (value: InterceptResponse) => {
              if (!completed) {
                resolve(value);
                completed = true;
              }
            };

            const _reject = (error: Error) => {
              if (!completed) {
                // @ts-expect-error
                error.request = xhr;
                reject(error);
                completed = true;
              }
            };

            xhr.addEventListener('readystatechange', () => {
              // 未就绪，或者已经处理完毕
              if (completed || xhr.readyState !== AJAXState.DONE) {
                return;
              }

              // The request errored out and we didn't get a response, this will be
              // handled by onerror instead
              // With one exception: request that using file: protocol, most browsers
              // will return status as 0 even though it's a successful request
              if (xhr.status === 0 && !(xhr.responseURL && xhr.responseURL.indexOf('file:') === 0)) {
                return;
              }

              // 请求完成
              const responseType = xhr.responseType;
              let parsedHeaders: Headers;
              const response: InterceptResponse = {
                status: xhr.status,
                statusText: xhr.statusText,
                get body() {
                  return !responseType || responseType === 'text' || responseType === 'json'
                    ? xhr.responseText
                    : xhr.response;
                },
                get headers() {
                  return (parsedHeaders ??= parseHeaders(xhr.getAllResponseHeaders?.() ?? ''));
                },
                raw: {
                  type: 'ajax',
                  xhr,
                },
                async json() {
                  if (!isJSONResponse(this.headers) || !xhr.responseText) {
                    return null;
                  }

                  try {
                    return JSON.parse(xhr.responseText);
                  } catch (err) {
                    console.debug(`[mapp] failed to get json from xhr`, xhr, err);
                    return null;
                  }
                },
              };

              _resolve(response);
            });

            // 监听其他事件
            xhr.addEventListener('abort', () => {
              _reject(new Error('XMLHttpRequest aborted'));
            });

            xhr.addEventListener('error', () => {
              _reject(new Error('XMLHttpRequest error'));
            });

            xhr.addEventListener('timeout', () => {
              _reject(new Error('XMLHttpRequest timeout'));
            });

            // 发起请求之前设置 headers
            for (const [key, value] of headers.entries()) {
              originSetRequestHeader.call(xhr, key, value);
            }

            // 发起请求
            originSend.apply(xhr, args);
          });
        });
      } else {
        originSend.apply(xhr, args);
      }
    };
  }
}
