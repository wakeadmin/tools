import { EventEmitter } from '@wakeadmin/utils';
import { InterceptRequest, InterceptResponse } from '../../types';

import { parseHeaders, AJAXInterceptor, AJAXState } from './AJAXInterceptor';
import { stringifyHeaders } from './helper.test.share';

test('parseHeaders', () => {
  expect(stringifyHeaders(parseHeaders(''))).toBe('[]');
  expect(
    stringifyHeaders(
      parseHeaders(
        `date: Fri, 08 Dec 2017 21:04:30 GMT\r\ncontent-encoding: gzip\r\nx-content-type-options: nosniff\r\n`
      )
    )
  ).toBe('[["date","Fri, 08 Dec 2017 21:04:30 GMT"],["content-encoding","gzip"],["x-content-type-options","nosniff"]]');
});

describe('AJAXInterceptor', () => {
  class MockAJAX extends EventEmitter {
    readyState: number = AJAXState.UNSENT;

    status = 0;

    statusText = '';

    responseURL = 'http://test';

    responseType = 'text';

    private headers: Record<string, string> = {};

    body: any;

    get responseText() {
      return this.body;
    }

    get response() {
      return this.body;
    }

    addEventListener(type: string, listener: (...args: any[]) => void) {
      this.on(type, listener);
    }

    open(method: string, url: string, async?: boolean, username?: string, password?: string) {
      this.readyState = AJAXState.OPENED;
    }

    setRequestHeader(key: string, value: string) {
      this.headers[key] = value;
    }

    getAllResponseHeaders() {
      return `date: Fri, 08 Dec 2017 21:04:30 GMT\r\ncontent-encoding: gzip\r\nx-content-type-options: nosniff\r\ncontent-type: application/json`;
    }

    send(body: any) {
      this.body = body;
    }
  }

  window.XMLHttpRequest = MockAJAX as any;

  const interceptor = new AJAXInterceptor();
  const register = jest.fn((req: InterceptRequest, next) => {
    req.headers.set('X-Add-By-Interceptor', 'yes');
    req.headers.set('bar', 'override bar');
    return Promise.resolve(next());
  });

  const getRequest = () => register.mock.calls[0][0];

  interceptor.attach();

  beforeEach(() => {
    interceptor.clean();
    register.mockClear();
  });

  test('request 信息收集', () => {
    interceptor.register(register);

    const xhr = new window.XMLHttpRequest();

    xhr.open('POST', '/foo/bar', true, 'foo', 'bar');
    xhr.setRequestHeader('Foo', 'foo');
    xhr.setRequestHeader('Bar', 'bar');

    // 设置了两次，这里应该是 append
    xhr.setRequestHeader('Foo', 'baz');

    xhr.send('body');

    const req = getRequest();
    expect(req).toMatchObject({
      url: 'http://foo:bar@localhost/foo/bar',
      method: 'POST',
      body: 'body',
      raw: {
        type: 'ajax',
        xhr,
      },
    });
    expect(stringifyHeaders(req.headers)).toBe(
      // foo 设置了两次，采用 append 形式
      // bar 在拦截器中被重置
      // x-add-by-interceptor 为拦截器添加
      '[["foo","foo, baz"],["bar","override bar"],["x-add-by-interceptor","yes"]]'
    );
  });

  test('正确数据响应', async () => {
    interceptor.register(register);
    const xhr = new window.XMLHttpRequest() as unknown as MockAJAX;
    xhr.open('POST', '/foo/bar');
    xhr.send('{"foo": "bar"}');

    expect(xhr.body).toBe('{"foo": "bar"}');
    xhr.readyState = AJAXState.DONE;
    xhr.status = 400;
    xhr.statusText = 'Not Ok';
    xhr.emit('readystatechange');

    const response = (await register.mock.results[0].value) as InterceptResponse;

    expect(response).toMatchObject({
      body: '{"foo": "bar"}',
      status: 400,
      statusText: 'Not Ok',
      raw: {
        type: 'ajax',
        xhr,
      },
    });

    expect(stringifyHeaders(response.headers)).toBe(
      '[["date","Fri, 08 Dec 2017 21:04:30 GMT"],["content-encoding","gzip"],["x-content-type-options","nosniff"],["content-type","application/json"]]'
    );

    // json 解析
    expect(await response.json()).toEqual({ foo: 'bar' });
  });

  test('异常数据响应', () => {
    interceptor.register(register);
    const xhr = new window.XMLHttpRequest() as unknown as MockAJAX;
    xhr.open('POST', '/foo/bar');
    xhr.send('body');

    xhr.emit('abort');

    expect(register.mock.results[0].value).rejects.toThrowError('XMLHttpRequest aborted');
  });
});
