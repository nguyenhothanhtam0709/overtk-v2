import type { TypedPropertyDecorator } from '@overtk/common/typing/decorator';
import type { ObjectKey } from '@overtk/common/typing/class';
import type { IsNumberOptions } from 'class-validator';
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
  TOptional extends boolean,
> = ClassPropertyDecoratorCommonOptions<TTarget, TKey, TOptional> & {
  min?: number;
  max?: number;
  integer?: boolean;
  decimal?: boolean;
} & IsNumberOptions;

export function NumberPropertyDecorator<
  // eslint-disable-next-line @typescript-eslint/ban-types
  TTarget extends Object,
  TKey extends ObjectKey<TTarget>,
  TOptional extends boolean,
>(
  options: NumberPropertyDecoratorOptions<TTarget, TKey, TOptional> = {
    allowNaN: false,
    allowInfinity: false,
  },
): TypedPropertyDecorator<TTarget, TKey, number, TOptional> {
  const appliedDecorators: PropertyDecorator[] = [
    IsNumber(options),
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
