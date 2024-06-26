export type { Class } from 'type-fest';

export type ClassPropertyKey = string | symbol;

// eslint-disable-next-line @typescript-eslint/ban-types
export type ObjectKey<TObj extends Object> = keyof TObj;
