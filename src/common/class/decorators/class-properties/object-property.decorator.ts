import type { TypedPropertyDecorator } from '@overtk/common/typing/decorator';
import type { ObjectKey, TypedClass } from '@overtk/common/typing/class';
import { applyDecorators } from '@nestjs/common';
import { IsObject } from 'class-validator';
import { decorate } from 'ts-mixer';
import { Type } from 'class-transformer';
import {
  getClassPropertyDecoratorsFromCommonOptions,
  type ClassPropertyDecoratorCommonOptions,
} from './_common';

type ObjectPropertyDecoratorOptions<
  // eslint-disable-next-line @typescript-eslint/ban-types
  TTarget extends Object,
  TKey extends ObjectKey<TTarget>,
  TValue extends object,
  TOptional extends boolean,
> = ClassPropertyDecoratorCommonOptions<TTarget, TKey, TOptional> & {
  type: TypedClass<TValue>;
};

export function ObjectPropertyDecorator<
  // eslint-disable-next-line @typescript-eslint/ban-types
  TTarget extends Object,
  TKey extends ObjectKey<TTarget>,
  TValue extends object,
  TOptional extends boolean,
>(
  options: ObjectPropertyDecoratorOptions<TTarget, TKey, TValue, TOptional>,
): TypedPropertyDecorator<TTarget, TKey, TValue, TOptional> {
  const appliedDecorators: PropertyDecorator[] = [
    IsObject(),
    Type(() => options.type),
    ...getClassPropertyDecoratorsFromCommonOptions(options),
  ];

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return decorate(applyDecorators(...appliedDecorators));
}
