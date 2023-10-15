import baseHeaders from './headers.simc';

export const encounterTypes = [
  'singleTargetRaid',
  'councilRaid',
  'mythicPlusSmallPack',
  'mythicPlusLargePack',
] as const;
export type EncounterType = (typeof encounterTypes)[number];
export const isEncounterType = (s: string): s is EncounterType =>
  encounterTypes.includes(s as EncounterType);

const headersWithTargetAndTime = (targets: number, time: number): string =>
  baseHeaders
    .replace('{{TARGETS}}', String(targets))
    .replace('{{TIME}}', String(time));

const headers: Record<EncounterType, string> = {
  councilRaid: headersWithTargetAndTime(4, 300),
  mythicPlusLargePack: headersWithTargetAndTime(10, 60),
  mythicPlusSmallPack: headersWithTargetAndTime(6, 40),
  singleTargetRaid: headersWithTargetAndTime(1, 300),
};
export const header = (encounterType: EncounterType): string =>
  headers[encounterType];
