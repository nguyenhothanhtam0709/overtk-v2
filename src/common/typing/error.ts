declare const error: unique symbol;
export type TypeError<M extends string> = {
  [error]: M;
};
