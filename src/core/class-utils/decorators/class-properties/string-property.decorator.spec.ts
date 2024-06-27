import { validateSync } from 'class-validator';
import { StringPropertyDecorator } from './string-property.decorator';

describe('StringPropertyDecorator', () => {
  describe('simple', () => {
    it('should work', () => {
      class A {
        @StringPropertyDecorator()
        public a: string = '10';

        public b!: string;
      }

      const a = new A();
      const errs = validateSync(a);

      expect(errs).toHaveLength(0);
    });

    it('should have error', () => {
      class A {
        @StringPropertyDecorator()
        public a!: string;

        public b!: string;
      }

      const a = new A();
      const errs = validateSync(a);

      expect(errs).not.toHaveLength(0);
    });
  });
});
