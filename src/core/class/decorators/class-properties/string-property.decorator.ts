import type { TypedPropertyDecorator } from '@overtk/core/typing/decorator';
import type { ObjectKey } from '@overtk/core/typing/class';
import { applyDecorators } from '@nestjs/common';
import { isDefined, IsString, MaxLength, MinLength } from 'class-validator';
import {
  getClassPropertyDecoratorsFromCommonOptions,
  type ClassPropertyDecoratorCommonOptions,
} from './_common';

type StringPropertyDecoratorOptions = ClassPropertyDecoratorCommonOptions & {
  minLength?: number;
  maxLength?: number;
};

export function StringPropertyDecorator<
  // eslint-disable-next-line @typescript-eslint/ban-types
  TTarget extends Object,
  TKey extends ObjectKey<TTarget>,
>(
  options: StringPropertyDecoratorOptions = {},
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

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return applyDecorators(...appliedDecorators);
}
