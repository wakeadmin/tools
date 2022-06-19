import { INetworkInterceptor, INetworkInterceptorRegister, InterceptRequest, InterceptResponse } from '../../types';

export class BaseInterceptor implements INetworkInterceptor {
  private interceptors: INetworkInterceptorRegister[] = [];

  /**
   * 注册拦截器
   * @param interceptor
   */
  register(interceptor: INetworkInterceptorRegister): void {
    this.interceptors.push(interceptor);
  }

  clean(): void {
    this.interceptors = [];
  }

  async apply(request: InterceptRequest, next: () => Promise<InterceptResponse>): Promise<any> {
    let interceptors = this.interceptors.slice();
    let pending: [Function, Function][] = [];
    let applied = 0;

    if (!interceptors.length) {
      return await next();
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
      return await Promise.all(interceptors.map(fn => fn(request, applyRequest)));
    }
  }
}
