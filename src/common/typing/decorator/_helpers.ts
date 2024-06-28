import type { TypeError } from '../error';

type MatcherPayload = {
  slot: unknown;
  value: unknown;
  optional: unknown;
  slotName: string;
  valueName: string;
};

export type CheckProperty<
  T extends MatcherPayload,
  Else,
> = T['optional'] extends true
  ? T['slot'] extends T['value'] | undefined
    ? Else
    : TypeError<`Type of ${T['slotName']} is not assignable to type of ${T['valueName']}.`>
  : T['slot'] extends T['value']
    ? Else
    : TypeError<`Type of ${T['slotName']} is not assignable to type of ${T['valueName']}.`>;
