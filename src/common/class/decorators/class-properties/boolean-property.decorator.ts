import type { TypedPropertyDecorator } from '@overtk/common/typing/decorator';
import type { ObjectKey } from '@overtk/common/typing/class';
import { applyDecorators } from '@nestjs/common';
import { IsBoolean } from 'class-validator';
import { decorate } from 'ts-mixer';
import {
  getPropertyDecoratorsFromCommonOptions,
  type PropertyDecoratorCommonOptions,
} from './_common';

type BooleanPropertyDecoratorOptions<
  TTarget extends object,
  TKey extends ObjectKey<TTarget>,
  TOptional extends boolean,
> = PropertyDecoratorCommonOptions<TTarget, TKey, TOptional>;

export function BooleanPropertyDecorator<
  TTarget extends object,
  TKey extends ObjectKey<TTarget>,
  TOptional extends boolean,
>(
  options: BooleanPropertyDecoratorOptions<TTarget, TKey, TOptional> = {},
): TypedPropertyDecorator<TTarget, TKey, boolean, TOptional> {
  const appliedDecorators: PropertyDecorator[] = [
    IsBoolean(),
    ...getPropertyDecoratorsFromCommonOptions(options),
  ];

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return decorate(applyDecorators(...appliedDecorators));
}
