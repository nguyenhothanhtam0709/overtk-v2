import type { TypedPropertyDecorator } from '@overtk/common/typing/decorator';
import type { ObjectKey } from '@overtk/common/typing/class';
import { applyDecorators } from '@nestjs/common';
import {
  isDefined,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { decorate } from 'ts-mixer';
import {
  getClassPropertyDecoratorsFromCommonOptions,
  type ClassPropertyDecoratorCommonOptions,
} from './_common';

type StringPropertyDecoratorOptions<
  // eslint-disable-next-line @typescript-eslint/ban-types
  TTarget extends Object,
  TKey extends ObjectKey<TTarget>,
> = ClassPropertyDecoratorCommonOptions<TTarget, TKey> & {
  minLength?: number;
  maxLength?: number;
  allowEmpty?: boolean;
};

export function StringPropertyDecorator<
  // eslint-disable-next-line @typescript-eslint/ban-types
  TTarget extends Object,
  TKey extends ObjectKey<TTarget>,
>(
  options: StringPropertyDecoratorOptions<TTarget, TKey> = {},
): TypedPropertyDecorator<TTarget, TKey, string> {
  const appliedDecorators: PropertyDecorator[] = [
    IsString(),
    ...getClassPropertyDecoratorsFromCommonOptions(options),
  ];

  if (isDefined(options.minLength)) {
    appliedDecorators.push(MinLength(options.minLength));
  }

  if (isDefined(options.maxLength)) {
    appliedDecorators.push(MaxLength(options.maxLength));
  }

  if (!options.allowEmpty) {
    appliedDecorators.push(IsNotEmpty());
  }

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return decorate(applyDecorators(...appliedDecorators));
}
