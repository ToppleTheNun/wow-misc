import { type Profile, profile as simcProfile } from "./profiles";
import { type EncounterType, header as encounterTypeHeader } from './headers';

export type GeneratedData = {
  header: string;

  actor: string;

  profilesets: string;
};

export const embellishments = async (
  profile: Profile,
  encounterType: EncounterType,
): Promise<GeneratedData> => {
  const header = encounterTypeHeader(encounterType);

  const actor = await simcProfile()
};
