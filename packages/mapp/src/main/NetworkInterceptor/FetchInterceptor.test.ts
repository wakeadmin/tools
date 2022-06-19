import { FetchInterceptor } from './FetchInterceptor';

describe('FetchInterceptor', () => {
  const successResponse = new Response('response', {
    headers: {
      'X-Foo': 'foo',
      'X-Bar': 'bar',
    },
    status: 200,
    statusText: 'OK',
  });

  const successResponsePromise = Promise.resolve(successResponse);

  const fakeFetch = jest.fn(() => successResponsePromise);

  window.fetch = fakeFetch;

  const interceptor = new FetchInterceptor();
  const register = jest.fn((req, next) => Promise.resolve(next()));

  const getRequest = () => register.mock.calls[0][0];
  const stringifyHeaders = (headers: Headers) => JSON.stringify(Array.from(headers.entries()));

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

  test('InterceptRequest by single url', () => {
    interceptor.register(register);

    const response = window.fetch('/foo/bar');

    expect(response).resolves.toBe(successResponse);

    const req = getRequest();
    expect(req.url).toBe('/foo/bar');
    expect(req.method).toBe('GET');
    expect(stringifyHeaders(req.headers)).toBe('[]');

    expect(fakeFetch).toBeCalledWith('/foo/bar', { headers: req.headers });

    expect(register.mock.results[0].value).resolves.toEqual({
      body: successResponse.body,
      status: 200,
      statusText: 'OK',
      headers: successResponse.headers,
    });
  });

  test('InterceptRequest by request', () => {
    interceptor.register(register);
    const request = new Request('/foo/bar', { method: 'POST', body: 'body', headers: { 'X-Foo': 'foo' } });

    window.fetch(request);

    const req = getRequest();
    expect(req.url).toBe('/foo/bar');
    expect(req.method).toBe('POST');
    expect(stringifyHeaders(req.headers)).toBe('[["x-foo","foo"],["content-type","text/plain;charset=UTF-8"]]');

    expect(fakeFetch).toBeCalledWith(request, { headers: req.headers });
  });

  test('InterceptRequest by url & init', () => {
    interceptor.register(register);

    window.fetch('/foo/bar', { method: 'POST', body: 'body', headers: { 'X-Foo': 'foo' } });

    const req = getRequest();
    expect(req.url).toBe('/foo/bar');
    expect(req.method).toBe('POST');
    expect(stringifyHeaders(req.headers)).toBe('[["x-foo","foo"]]');

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
