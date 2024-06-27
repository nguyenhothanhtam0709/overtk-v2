import type { TypedClassDecorator } from '@overtk/common/typing/decorator';
import type { TypedClass } from '@overtk/common/typing/class';
import type { ValidationError, ValidatorOptions } from 'class-validator';
import { validateSync } from 'class-validator';

export type ClassDecoratorOptions = {
  sealed?: boolean;
  /**
   * Instance of this class will be freeze after construction.
   * This option should be used carefully.
   */
  freeze?: boolean;
  /** Instance of this class will be validated after construction */
  validate?:
    | boolean
    | {
        validateOptions?: Pick<
          ValidatorOptions,
          'skipMissingProperties' | 'stopAtFirstError'
        >;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onValidateError?: (errors: ValidationError[]) => any;
      };
};

export function ClassDecorator<T extends object>(
  options: ClassDecoratorOptions = {},
): TypedClassDecorator<T> {
  return function <TClass extends TypedClass<T>>(
    constructor: TClass,
  ): TClass | void {
    let C = class extends constructor {};

    if (options.validate) {
      const validateOptions =
        typeof options.validate === 'object'
          ? options.validate.validateOptions
          : undefined;
      const onValidateError =
        typeof options.validate === 'object' &&
        typeof options.validate.onValidateError === 'function'
          ? options.validate.onValidateError
          : (errors: ValidationError[]) => errors;

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      C = class extends C {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        constructor(...args: any[]) {
          super(...args);
          onValidateError(validateSync(this, validateOptions));
        }
      };
    }

    if (options.freeze) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      C = class extends C {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        constructor(...args: any[]) {
          super(...args);
          Object.freeze(this);
        }
      };
    }

    if (options.sealed) {
      Object.seal(C);
      Object.seal(C.prototype);
    }

    return C;
  };
}
