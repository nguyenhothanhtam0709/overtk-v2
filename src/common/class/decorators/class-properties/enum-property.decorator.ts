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
  TTarget extends object,
  TKey extends ObjectKey<TTarget>,
  TOptional extends boolean,
> = ClassPropertyDecoratorCommonOptions<TTarget, TKey, TOptional> & {
  enum: object;
};

export function EnumPropertyDecorator<
  TTarget extends object,
  TKey extends ObjectKey<TTarget>,
  E,
  TOptional extends boolean,
>(
  options: EnumPropertyDecoratorOptions<TTarget, TKey, TOptional>,
): TypedPropertyDecorator<TTarget, TKey, E, TOptional> {
  const appliedDecorators: PropertyDecorator[] = [
    IsEnum(options.enum),
    ...getClassPropertyDecoratorsFromCommonOptions(options),
  ];

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return decorate(applyDecorators(...appliedDecorators));
}
