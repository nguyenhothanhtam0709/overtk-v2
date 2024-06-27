import type { TypedPropertyDecorator } from '@overtk/common/typing/decorator';
import type { ObjectKey } from '@overtk/common/typing/class';
import {
  IsDecimal,
  isDefined,
  IsInt,
  IsNumber,
  Max,
  Min,
} from 'class-validator';
import { decorate } from 'ts-mixer';
import { applyDecorators } from '@nestjs/common';
import {
  getClassPropertyDecoratorsFromCommonOptions,
  type ClassPropertyDecoratorCommonOptions,
} from './_common';

type NumberPropertyDecoratorOptions<
  // eslint-disable-next-line @typescript-eslint/ban-types
  TTarget extends Object,
  TKey extends ObjectKey<TTarget>,
> = ClassPropertyDecoratorCommonOptions<TTarget, TKey> & {
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
  options: NumberPropertyDecoratorOptions<TTarget, TKey> = {},
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
  return decorate(applyDecorators(...appliedDecorators));
}
