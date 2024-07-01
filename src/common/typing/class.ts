export type { Class as TypedClass } from 'type-fest';

export type ClassPropertyKey = string | symbol;

export type ObjectKey<TObj extends object> = keyof TObj;
