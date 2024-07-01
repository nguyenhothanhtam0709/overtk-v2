import type { TypedPropertyDecorator } from '@overtk/common/typing/decorator';
import type { ObjectKey, TypedClass } from '@overtk/common/typing/class';
import { applyDecorators } from '@nestjs/common';
import { IsObject } from 'class-validator';
import { decorate } from 'ts-mixer';
import { Type } from 'class-transformer';
import {
  getPropertyDecoratorsFromCommonOptions,
  type PropertyDecoratorCommonOptions,
} from './_common';

type ObjectPropertyDecoratorOptions<
  TTarget extends object,
  TKey extends ObjectKey<TTarget>,
  TValue extends object,
  TOptional extends boolean,
> = PropertyDecoratorCommonOptions<TTarget, TKey, TOptional> & {
  type: TypedClass<TValue>;
};

export function ObjectPropertyDecorator<
  TTarget extends object,
  TKey extends ObjectKey<TTarget>,
  TValue extends object,
  TOptional extends boolean,
>(
  options: ObjectPropertyDecoratorOptions<TTarget, TKey, TValue, TOptional>,
): TypedPropertyDecorator<TTarget, TKey, TValue, TOptional> {
  const appliedDecorators: PropertyDecorator[] = [
    IsObject(),
    Type(() => options.type),
    ...getPropertyDecoratorsFromCommonOptions(options),
  ];

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return decorate(applyDecorators(...appliedDecorators));
}
