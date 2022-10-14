import { INetworkInterceptor, INetworkInterceptorRegister, InterceptRequest, InterceptResponse } from '../../types';

export class BaseInterceptor implements INetworkInterceptor {
  private interceptors: INetworkInterceptorRegister[] = [];

  /**
   * 存在拦截器
   */
  protected get isIntercepted() {
    return this.interceptors.length > 0;
  }

  /**
   * 注册拦截器
   * @param interceptor
   */
  register(...interceptor: INetworkInterceptorRegister[]): void {
    this.interceptors.push(...interceptor);
  }

  clean(): void {
    this.interceptors = [];
  }

  async apply(
    request: InterceptRequest,
    next: () => Promise<InterceptResponse>
  ): Promise<{ type: 'success' | 'error'; result: any }> {
    let interceptors = this.interceptors.slice();
    let pending: [Function, Function][] = [];
    let applied = 0;

    try {
      if (!this.isIntercepted) {
        return { type: 'success', result: await next() };
      } else {
        const applyRequest = () => {
          applied++;

          return new Promise<InterceptResponse>((resolve, reject) => {
            pending.push([resolve, reject]);
            if (applied >= interceptors.length) {
              next().then(
                result => {
                  pending.forEach(([res]) => res(result));
                },
                error => {
                  pending.forEach(([_, rej]) => rej(error));
                }
              );
            }
          });
        };

        // 发起请求
        return {
          type: 'success',
          result: await Promise.all(interceptors.map(fn => fn(request, applyRequest))),
        };
      }
    } catch (err) {
      // ignore error
      return {
        type: 'error',
        result: err,
      };
    }
  }
}
