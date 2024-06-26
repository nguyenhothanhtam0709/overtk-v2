import type { TypedClassDecorator } from '@overtk/core/typing/decorator/typed-class-decorator';
import * as ClassPropertyDecorator from './class-properties';
import { ClassDecorator, type ClassDecoratorOptions } from './class.decorator';

export function Class<T extends object>(
  options: ClassDecoratorOptions = {},
): TypedClassDecorator<T> {
  return ClassDecorator<T>(options);
}

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace Class {
  //
  // Class decorator
  //
  export import Decorate = Class;

  //
  // Class Property decorators
  //
  export import StringProperty = ClassPropertyDecorator.StringPropertyDecorator;
  export import NumberProperty = ClassPropertyDecorator.NumberPropertyDecorator;
  export import BooleanProperty = ClassPropertyDecorator.BooleanPropertyDecorator;
  export import EnumProperty = ClassPropertyDecorator.EnumPropertyDecorator;
}
