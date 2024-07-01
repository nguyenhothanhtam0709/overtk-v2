import type { ObjectKey } from '@overtk/common/typing/class';
import { IsDefined, IsOptional } from 'class-validator';
import { Exclude, Expose, Transform } from 'class-transformer';

type TransformFunctionParams<
  TTarget extends object,
  TKey extends ObjectKey<TTarget>,
> = {
  /** Original value */
  value: unknown;
  /** Property key */
  key: TKey;
  /** Target object */
  obj: TTarget;
};

type TransformFunction<
  TTarget extends object,
  TKey extends ObjectKey<TTarget>,
> = (params: TransformFunctionParams<TTarget, TKey>) => TTarget[TKey];

export type PropertyDecoratorCommonOptions<
  TTarget extends object,
  TKey extends ObjectKey<TTarget>,
  TOptional extends boolean,
> = {
  optional?: TOptional;
  exclude?: boolean;
  /** apply Transform decorator */
  transform?: TransformFunction<TTarget, TKey>;
};

export function getPropertyDecoratorsFromCommonOptions<
  TTarget extends object,
  TKey extends ObjectKey<TTarget>,
  TOptional extends boolean,
>(
  options: PropertyDecoratorCommonOptions<TTarget, TKey, TOptional> = {},
): PropertyDecorator[] {
  const commonDecorators: PropertyDecorator[] = [];

  // Default is not empty class property
  commonDecorators.push(options.optional ? IsOptional() : IsDefined());

  if (options.exclude) {
    commonDecorators.push(Exclude());
  } else {
    commonDecorators.push(Expose());
  }

  if (options.transform) {
    commonDecorators.push(
      Transform(
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        options.transform,
      ),
    );
  }

  return commonDecorators;
}
