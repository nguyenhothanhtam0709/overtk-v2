import type { CheckProperty } from './_helpers';
import type { ObjectKey } from '../class';

export type TypedPropertyDecorator<
  TTarget extends object,
  TKey extends ObjectKey<TTarget>,
  TValue,
  TOptional extends boolean = false,
> = (
  target: TTarget,
  propertyKey: TKey,
) => void | CheckProperty<
  {
    slot: TTarget[TKey];
    value: TValue;
    optional: TOptional;
    slotName: 'property';
    valueName: 'decorator';
  },
  never
>;
