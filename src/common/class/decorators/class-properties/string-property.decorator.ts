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
  getPropertyDecoratorsFromCommonOptions,
  type PropertyDecoratorCommonOptions,
} from './_common';

type StringPropertyDecoratorOptions<
  TTarget extends object,
  TKey extends ObjectKey<TTarget>,
  TOptional extends boolean,
> = PropertyDecoratorCommonOptions<TTarget, TKey, TOptional> & {
  minLength?: number;
  maxLength?: number;
  allowEmpty?: boolean;
};

export function StringPropertyDecorator<
  TTarget extends object,
  TKey extends ObjectKey<TTarget>,
  TOptional extends boolean,
>(
  options: StringPropertyDecoratorOptions<TTarget, TKey, TOptional> = {},
): TypedPropertyDecorator<TTarget, TKey, string, TOptional> {
  const appliedDecorators: PropertyDecorator[] = [
    IsString(),
    ...getPropertyDecoratorsFromCommonOptions(options),
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
