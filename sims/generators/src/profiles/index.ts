import { Slot } from '../combinations/combinations';

export const profiles = ['T31_Demon_Hunter_Vengeance'] as const;
export type Profile = (typeof profiles)[number];
export const isProfile = (s: string): s is Profile => profiles.includes(s as Profile);

export const profile = (name: Profile): Promise<string> => import(`./${name}`);

export const profileWithoutSlots = async (name: Profile, slots: Slot[]) => {
  const baseActor = await profile(name);
  return baseActor
    .split('\n')
    .filter((line) => !slots.some((slot) => line.startsWith(slot)))
    .join('\n');
};
