import { InterceptRequest, InterceptResponse } from '../../types';

import { FetchInterceptor } from './FetchInterceptor';
import { stringifyHeaders } from './helper.test.share';

describe('FetchInterceptor', () => {
  const successResponse = new Response('response', {
    headers: {
      'X-Foo': 'foo',
      'X-Bar': 'bar',
      'Content-Type': 'application/json',
    },
    status: 200,
    statusText: 'OK',
  });
  successResponse.json = async () => ({ foo: 'bar' });
  successResponse.clone = () => {
    return successResponse;
  };

  const successResponsePromise = Promise.resolve(successResponse);

  const fakeFetch = jest.fn(() => successResponsePromise);

  window.fetch = fakeFetch;

  const interceptor = new FetchInterceptor();
  const register = jest.fn((req: InterceptRequest, next) => Promise.resolve(next()));

  const getRequest = () => register.mock.calls[0][0];

  beforeEach(() => {
    interceptor.clean();
    fakeFetch.mockClear();
    register.mockClear();
  });

  test('覆盖 fetch', () => {
    expect(window.fetch).toBe(fakeFetch);

    interceptor.attach();

    expect(window.fetch).not.toBe(fakeFetch);
  });

  test('InterceptRequest by single url', async () => {
    interceptor.register(register);

    const response = window.fetch('/foo/bar');

    expect(response).resolves.toBe(successResponse);

    const req = getRequest();
    expect(req.url).toBe('/foo/bar');
    expect(req.method).toBe('GET');
    expect(stringifyHeaders(req.headers)).toBe('[]');
    expect(req.raw).toEqual({
      type: 'fetch',
      input: '/foo/bar',
    });

    expect(fakeFetch).toBeCalledWith('/foo/bar', { headers: req.headers });

    const res = (await register.mock.results[0].value) as InterceptResponse;

    expect(res).toMatchObject({
      body: successResponse.body,
      status: 200,
      statusText: 'OK',
      headers: successResponse.headers,
      raw: {
        type: 'fetch',
        response: successResponse,
      },
    });

    // json 获取
    expect(await res.json()).toEqual({ foo: 'bar' });
  });

  test('InterceptRequest by request', () => {
    interceptor.register(register);
    const request = new Request('/foo/bar', { method: 'POST', body: 'body', headers: { 'X-Foo': 'foo' } });

    window.fetch(request);

    const req = getRequest();
    expect(req.url).toBe('/foo/bar');
    expect(req.method).toBe('POST');
    expect(stringifyHeaders(req.headers)).toBe('[["x-foo","foo"],["content-type","text/plain;charset=UTF-8"]]');
    expect(req.raw).toEqual({
      type: 'fetch',
      input: request,
    });

    expect(fakeFetch).toBeCalledWith(request, { headers: req.headers });
  });

  test('InterceptRequest by url & init', () => {
    interceptor.register(register);

    window.fetch('/foo/bar', { method: 'POST', body: 'body', headers: { 'X-Foo': 'foo' } });

    const req = getRequest();
    expect(req.url).toBe('/foo/bar');
    expect(req.method).toBe('POST');
    expect(stringifyHeaders(req.headers)).toBe('[["x-foo","foo"]]');
    expect(req.raw).toEqual({
      type: 'fetch',
      input: '/foo/bar',
      init: {
        method: 'POST',
        body: 'body',
        headers: { 'X-Foo': 'foo' },
      },
    });

    expect(fakeFetch).toBeCalledWith('/foo/bar', { method: 'POST', body: 'body', headers: req.headers });
  });

  test('InterceptRequest by request & init', () => {
    interceptor.register(register);
    const request = new Request('/foo/bar', { method: 'POST' });

    window.fetch(request, { headers: { 'X-Foo': 'foo' }, body: 'body' });

    const req = getRequest();
    expect(req.url).toBe('/foo/bar');
    expect(req.method).toBe('POST');
    expect(stringifyHeaders(req.headers)).toBe('[["x-foo","foo"]]');

    expect(fakeFetch).toBeCalledWith(request, { body: 'body', headers: req.headers });
  });
});
