import type { TypedPropertyDecorator } from '@overtk/core/typing/decorator';
import type { ObjectKey } from '@overtk/core/typing/class';
import { applyDecorators } from '@nestjs/common';
import { IsBoolean } from 'class-validator';
import {
  getClassPropertyDecoratorsFromCommonOptions,
  type ClassPropertyDecoratorCommonOptions,
} from './_common';

type BooleanPropertyDecoratorOptions = ClassPropertyDecoratorCommonOptions;

export function BooleanPropertyDecorator<
  // eslint-disable-next-line @typescript-eslint/ban-types
  TTarget extends Object,
  TKey extends ObjectKey<TTarget>,
>(
  options: BooleanPropertyDecoratorOptions = {},
): TypedPropertyDecorator<TTarget, TKey, string> {
  const appliedDecorators: PropertyDecorator[] = [
    IsBoolean(),
    ...getClassPropertyDecoratorsFromCommonOptions(options),
  ];

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return applyDecorators(...appliedDecorators);
}
