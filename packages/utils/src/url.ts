export function trimQuery(path: string) {
  const qIdx = path.indexOf('?');
  if (qIdx !== -1) {
    return path.substring(0, qIdx);
  }

  return path;
}

export function trimHash(path: string) {
  const hIdx = path.indexOf('#');
  if (hIdx !== -1) {
    return path.substring(0, hIdx);
  }

  return path;
}

export function trimQueryAndHash(path: string) {
  return trimQuery(trimHash(path));
}
