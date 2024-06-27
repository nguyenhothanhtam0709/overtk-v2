import { resolve } from 'node:path';
import { rootPath } from './constants';

/** resolve path by current root path */
export const resolvePathFromRoot = (...paths: string[]): string =>
  resolve(rootPath, ...paths);
