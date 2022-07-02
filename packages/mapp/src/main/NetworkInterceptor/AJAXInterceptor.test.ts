import { EventEmitter } from '@wakeadmin/utils';
import { InterceptRequest } from '../../types';

import { parseHeaders, spyHeaders, AJAXInterceptor, AJAXState } from './AJAXInterceptor';
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

test('spyHeaders', () => {
  const fn = jest.fn();
  const headers = new Headers();

  spyHeaders(headers, fn);

  headers.set('Foo', 'bar');
  expect(fn).toBeCalledWith('Foo', 'bar');

  headers.append('Foo', 'baz');
  expect(fn).toBeCalledWith('Foo', 'bar, baz');
  expect(headers.get('Foo')).toBe('bar, baz');

  headers.delete('Foo');
  expect(fn).toBeCalledWith('Foo', null);
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
      return `date: Fri, 08 Dec 2017 21:04:30 GMT\r\ncontent-encoding: gzip\r\nx-content-type-options: nosniff\r\n`;
    }

    send(body: any) {
      this.body = body;
    }
  }

  window.XMLHttpRequest = MockAJAX as any;

  const interceptor = new AJAXInterceptor();
  const register = jest.fn((req: InterceptRequest, next) => {
    req.headers.set('X-Add-By-Interceptor', 'yes');
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
    expect(stringifyHeaders(req.headers)).toBe('[["foo","foo"],["bar","bar"],["x-add-by-interceptor","yes"]]');
  });

  test('正确数据响应', async () => {
    interceptor.register(register);
    const xhr = new window.XMLHttpRequest() as unknown as MockAJAX;
    xhr.open('POST', '/foo/bar');
    xhr.send('body');

    expect(xhr.body).toBe('body');
    xhr.readyState = AJAXState.DONE;
    xhr.status = 400;
    xhr.statusText = 'Not Ok';
    xhr.emit('readystatechange');

    const response = await register.mock.results[0].value;

    expect(response).toMatchObject({
      body: 'body',
      status: 400,
      statusText: 'Not Ok',
    });
    expect(stringifyHeaders(response.headers)).toBe(
      '[["date","Fri, 08 Dec 2017 21:04:30 GMT"],["content-encoding","gzip"],["x-content-type-options","nosniff"]]'
    );
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
