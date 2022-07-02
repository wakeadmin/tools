export function isJSONResponse(headers: Headers) {
  return headers.get('content-type')?.includes('json');
}
