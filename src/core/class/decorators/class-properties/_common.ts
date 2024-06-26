import { IsNotEmpty, IsOptional } from 'class-validator';
import { Exclude } from 'class-transformer';

export type ClassPropertyDecoratorCommonOptions = {
  optional?: string;
  exclude?: boolean;
};

export function getClassPropertyDecoratorsFromCommonOptions(
  options: ClassPropertyDecoratorCommonOptions = {},
): PropertyDecorator[] {
  const commonDecorators: PropertyDecorator[] = [];

  // Default is not empty class property
  commonDecorators.push(options.optional ? IsOptional() : IsNotEmpty());

  if (options.exclude) {
    commonDecorators.push(Exclude());
  }

  return commonDecorators;
}
