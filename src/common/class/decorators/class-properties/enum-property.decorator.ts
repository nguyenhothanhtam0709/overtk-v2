import type { TypedPropertyDecorator } from '@overtk/common/typing/decorator';
import type { ObjectKey } from '@overtk/common/typing/class';
import { applyDecorators } from '@nestjs/common';
import { IsEnum } from 'class-validator';
import { decorate } from 'ts-mixer';
import {
  getClassPropertyDecoratorsFromCommonOptions,
  type ClassPropertyDecoratorCommonOptions,
} from './_common';

type EnumPropertyDecoratorOptions<
  // eslint-disable-next-line @typescript-eslint/ban-types
  TTarget extends Object,
  TKey extends ObjectKey<TTarget>,
> = ClassPropertyDecoratorCommonOptions<TTarget, TKey> & {
  enum: object;
};

export function EnumPropertyDecorator<
  // eslint-disable-next-line @typescript-eslint/ban-types
  TTarget extends Object,
  TKey extends ObjectKey<TTarget>,
  E,
>(
  options: EnumPropertyDecoratorOptions<TTarget, TKey>,
): TypedPropertyDecorator<TTarget, TKey, E> {
  const appliedDecorators: PropertyDecorator[] = [
    IsEnum(options.enum),
    ...getClassPropertyDecoratorsFromCommonOptions(options),
  ];

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return decorate(applyDecorators(...appliedDecorators));
}
