import ch from 'node:child_process';

export function isPnpmSupported() {
  try {
    ch.execSync('pnpm -v');
    return true;
  } catch (err) {
    return false;
  }
}

export function isYarnSupported() {
  try {
    ch.execSync('yarn -v');
    return true;
  } catch (err) {
    return false;
  }
}

export const PNPM_SUPPORTED = isPnpmSupported();
export const YARN_SUPPORTED = isYarnSupported();
export const PACKAGE_MANAGER_NAME = PNPM_SUPPORTED ? 'pnpm' : YARN_SUPPORTED ? 'yarn' : 'npm';
