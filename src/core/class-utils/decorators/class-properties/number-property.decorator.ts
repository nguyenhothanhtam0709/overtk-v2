import type { TypedPropertyDecorator } from '@overtk/core/typing/decorator';
import type { ObjectKey } from '@overtk/core/typing/class';
import {
  IsDecimal,
  isDefined,
  IsInt,
  IsNumber,
  Max,
  Min,
} from 'class-validator';
import {
  getClassPropertyDecoratorsFromCommonOptions,
  type ClassPropertyDecoratorCommonOptions,
} from './_common';

type NumberPropertyDecoratorOptions = ClassPropertyDecoratorCommonOptions & {
  min?: number;
  max?: number;
  integer?: boolean;
  decimal?: boolean;
};

export function NumberPropertyDecorator<
  // eslint-disable-next-line @typescript-eslint/ban-types
  TTarget extends Object,
  TKey extends ObjectKey<TTarget>,
>(
  options: NumberPropertyDecoratorOptions = {},
): TypedPropertyDecorator<TTarget, TKey, number> {
  const appliedDecorators: PropertyDecorator[] = [
    IsNumber(),
    ...getClassPropertyDecoratorsFromCommonOptions(options),
  ];

  if (isDefined(options.min)) {
    appliedDecorators.push(Min(options.min));
  }

  if (isDefined(options.max)) {
    appliedDecorators.push(Max(options.max));
  }

  if (options.integer) {
    appliedDecorators.push(IsInt());
  }

  if (options.decimal) {
    appliedDecorators.push(IsDecimal());
  }

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return applyDecorators(...appliedDecorators);
}
