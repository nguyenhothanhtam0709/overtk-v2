import type { ObjectKey } from '@overtk/common/typing/class';
import { IsDefined, IsOptional } from 'class-validator';
import { Exclude, Expose, Transform } from 'class-transformer';

type TransformFunctionParams<
  // eslint-disable-next-line @typescript-eslint/ban-types
  TTarget extends Object,
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
  // eslint-disable-next-line @typescript-eslint/ban-types
  TTarget extends Object,
  TKey extends ObjectKey<TTarget>,
> = (params: TransformFunctionParams<TTarget, TKey>) => TTarget[TKey];

export type ClassPropertyDecoratorCommonOptions<
  // eslint-disable-next-line @typescript-eslint/ban-types
  TTarget extends Object,
  TKey extends ObjectKey<TTarget>,
> = {
  optional?: boolean;
  exclude?: boolean;
  /** apply Transform decorator */
  transform?: TransformFunction<TTarget, TKey>;
};

export function getClassPropertyDecoratorsFromCommonOptions<
  // eslint-disable-next-line @typescript-eslint/ban-types
  TTarget extends Object,
  TKey extends ObjectKey<TTarget>,
>(
  options: ClassPropertyDecoratorCommonOptions<TTarget, TKey> = {},
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
