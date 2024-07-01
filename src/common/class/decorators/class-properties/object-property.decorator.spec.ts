import { validateSync } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { StringPropertyDecorator } from './string-property.decorator';
import { NumberPropertyDecorator } from './number-property.decorator';
import { ObjectPropertyDecorator } from './object-property.decorator';

describe('ObjectPropertyDecorator', () => {
  describe('simple', () => {
    it('should work', () => {
      class Child {
        @StringPropertyDecorator({
          transform: ({ value }) => `${value}`,
        })
        public field1!: string;

        @NumberPropertyDecorator()
        public field2!: number;
      }

      class Parent {
        @ObjectPropertyDecorator({
          type: Child,
        })
        public a!: Child;
      }

      const ins = plainToInstance(Parent, {
        a: {
          field1: 1,
          field2: 2,
        },
      });
      const errs = validateSync(ins);

      expect(errs).toHaveLength(0);
    });
  });
});
