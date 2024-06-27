import { validateSync } from 'class-validator';
import { EnumPropertyDecorator } from './enum-property.decorator';

describe('EnumPropertyDecorator', () => {
  describe('simple', () => {
    it('should work', () => {
      enum E {
        E1 = 'E1',
        E2 = 'E2',
      }

      class A {
        @EnumPropertyDecorator({
          enum: E,
        })
        public e!: E;

        public b!: string;
      }

      const a = new A();
      // using @ts-ignore to test
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      a.e = 1;

      const errs = validateSync(a);

      expect(errs).not.toHaveLength(0);
    });
  });
});
