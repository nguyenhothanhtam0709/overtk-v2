import { StringPropertyDecorator } from './class-properties';
import { ClassDecorator } from './class.decorator';

describe('ClassDecorator', () => {
  describe('simple', () => {
    it('should not have error', () => {
      @ClassDecorator()
      class A {
        public a!: string;

        public b!: string;
      }

      // using @ts-ignore to test
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      expect(() => (A.prototype.c = 1)).not.toThrow();

      const a = new A();
      expect(() => {
        a.a = '1';
      }).not.toThrow();
    });

    it('should be sealed', () => {
      @ClassDecorator({
        sealed: true,
      })
      class A {
        public a!: string;

        public b!: string;
      }

      // using @ts-ignore to test
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      expect(() => (A.prototype.c = 1)).toThrow(TypeError);
    });

    it('instance should be freezes', () => {
      @ClassDecorator({
        freeze: true,
      })
      class A {
        public a!: string;

        public b!: string;
      }

      const a = new A();
      expect(() => {
        a.a = '1';
      }).toThrow(TypeError);
    });

    it('instance should throw validate errors', () => {
      @ClassDecorator({
        validate: {
          onValidateError(errors) {
            throw errors;
          },
        },
      })
      class A {
        @StringPropertyDecorator()
        public a: string;

        @StringPropertyDecorator()
        public b!: string;

        constructor() {
          this.a = '10';
        }
      }

      expect(() => {
        new A();
      }).toThrow();
    });
  });
});
