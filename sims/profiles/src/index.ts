import T31DemonHunterVengeance from "./T31_Demon_Hunter_Vengeance.simc";

export const T31_Demon_Hunter_Vengeance: string = T31DemonHunterVengeance;

export const profiles = ["T31_Demon_Hunter_Vengeance"] as const;
export type Profile = (typeof profiles)[number];
export const isProfile = (s: string): s is Profile =>
  profiles.includes(s as Profile);

const profileMapping: Record<Profile, string> = {
  T31_Demon_Hunter_Vengeance,
};
export const getProfile = (profile: Profile): string => profileMapping[profile];
