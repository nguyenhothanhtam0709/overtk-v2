import type { TypedPropertyDecorator } from '@overtk/common/typing/decorator';
import type { ObjectKey } from '@overtk/common/typing/class';
import { applyDecorators } from '@nestjs/common';
import { IsBoolean } from 'class-validator';
import { decorate } from 'ts-mixer';
import {
  getClassPropertyDecoratorsFromCommonOptions,
  type ClassPropertyDecoratorCommonOptions,
} from './_common';

type BooleanPropertyDecoratorOptions<
  // eslint-disable-next-line @typescript-eslint/ban-types
  TTarget extends Object,
  TKey extends ObjectKey<TTarget>,
> = ClassPropertyDecoratorCommonOptions<TTarget, TKey>;

export function BooleanPropertyDecorator<
  // eslint-disable-next-line @typescript-eslint/ban-types
  TTarget extends Object,
  TKey extends ObjectKey<TTarget>,
>(
  options: BooleanPropertyDecoratorOptions<TTarget, TKey> = {},
): TypedPropertyDecorator<TTarget, TKey, boolean> {
  const appliedDecorators: PropertyDecorator[] = [
    IsBoolean(),
    ...getClassPropertyDecoratorsFromCommonOptions(options),
  ];

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return decorate(applyDecorators(...appliedDecorators));
}
