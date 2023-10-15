import {
  type EncounterType,
  type Generator,
  getGeneratorByName,
  type GeneratorName,
  isGeneratorName,
} from "@topplethenun/wow-misc-sims-generators";
import { type Profile } from "@topplethenun/wow-misc-sims-profiles";
import { snakeToPascal } from "@topplethenun/wow-misc-sims-utils";
import T31DemonHunterVengeanceCraftedEmbellishmentsCouncilRaid from "./T31_Demon_Hunter_Vengeance_Crafted_embellishments_CouncilRaid.simc";
import T31DemonHunterVengeanceCraftedEmbellishmentsMythicPlusLargePack from "./T31_Demon_Hunter_Vengeance_Crafted_embellishments_MythicPlusLargePack.simc";
import T31DemonHunterVengeanceCraftedEmbellishmentsMythicPlusSmallPack from "./T31_Demon_Hunter_Vengeance_Crafted_embellishments_MythicPlusSmallPack.simc";
import T31DemonHunterVengeanceCraftedEmbellishmentsSingleTargetRaid from "./T31_Demon_Hunter_Vengeance_Crafted_embellishments_SingleTargetRaid.simc";
import T31DemonHunterVengeanceRingsCouncilRaid from "./T31_Demon_Hunter_Vengeance_rings_CouncilRaid.simc";
import T31DemonHunterVengeanceRingsMythicPlusLargePack from "./T31_Demon_Hunter_Vengeance_rings_MythicPlusLargePack.simc";
import T31DemonHunterVengeanceRingsMythicPlusSmallPack from "./T31_Demon_Hunter_Vengeance_rings_MythicPlusSmallPack.simc";
import T31DemonHunterVengeanceRingsSingleTargetRaid from "./T31_Demon_Hunter_Vengeance_rings_SingleTargetRaid.simc";
import T31DemonHunterVengeanceTrinketsCouncilRaid from "./T31_Demon_Hunter_Vengeance_trinkets_CouncilRaid.simc";
import T31DemonHunterVengeanceTrinketsMythicPlusLargePack from "./T31_Demon_Hunter_Vengeance_trinkets_MythicPlusLargePack.simc";
import T31DemonHunterVengeanceTrinketsMythicPlusSmallPack from "./T31_Demon_Hunter_Vengeance_trinkets_MythicPlusSmallPack.simc";
import T31DemonHunterVengeanceTrinketsSingleTargetRaid from "./T31_Demon_Hunter_Vengeance_trinkets_SingleTargetRaid.simc";
import T31DemonHunterVengeanceWeaponsCouncilRaid from "./T31_Demon_Hunter_Vengeance_weapons_CouncilRaid.simc";
import T31DemonHunterVengeanceWeaponsMythicPlusLargePack from "./T31_Demon_Hunter_Vengeance_weapons_MythicPlusLargePack.simc";
import T31DemonHunterVengeanceWeaponsMythicPlusSmallPack from "./T31_Demon_Hunter_Vengeance_weapons_MythicPlusSmallPack.simc";
import T31DemonHunterVengeanceWeaponsSingleTargetRaid from "./T31_Demon_Hunter_Vengeance_weapons_SingleTargetRaid.simc";

/* eslint-disable camelcase -- Disabling because this needs to match simc. */
export const T31_Demon_Hunter_Vengeance_Crafted_embellishments_CouncilRaid: string =
  T31DemonHunterVengeanceCraftedEmbellishmentsCouncilRaid;
export const T31_Demon_Hunter_Vengeance_Crafted_embellishments_MythicPlusLargePack: string =
  T31DemonHunterVengeanceCraftedEmbellishmentsMythicPlusLargePack;
export const T31_Demon_Hunter_Vengeance_Crafted_embellishments_MythicPlusSmallPack: string =
  T31DemonHunterVengeanceCraftedEmbellishmentsMythicPlusSmallPack;
export const T31_Demon_Hunter_Vengeance_Crafted_embellishments_SingleTargetRaid: string =
  T31DemonHunterVengeanceCraftedEmbellishmentsSingleTargetRaid;
export const T31_Demon_Hunter_Vengeance_rings_CouncilRaid: string =
  T31DemonHunterVengeanceRingsCouncilRaid;
export const T31_Demon_Hunter_Vengeance_rings_MythicPlusLargePack: string =
  T31DemonHunterVengeanceRingsMythicPlusLargePack;
export const T31_Demon_Hunter_Vengeance_rings_MythicPlusSmallPack: string =
  T31DemonHunterVengeanceRingsMythicPlusSmallPack;
export const T31_Demon_Hunter_Vengeance_rings_SingleTargetRaid: string =
  T31DemonHunterVengeanceRingsSingleTargetRaid;
export const T31_Demon_Hunter_Vengeance_trinkets_CouncilRaid: string =
  T31DemonHunterVengeanceTrinketsCouncilRaid;
export const T31_Demon_Hunter_Vengeance_trinkets_MythicPlusLargePack: string =
  T31DemonHunterVengeanceTrinketsMythicPlusLargePack;
export const T31_Demon_Hunter_Vengeance_trinkets_MythicPlusSmallPack: string =
  T31DemonHunterVengeanceTrinketsMythicPlusSmallPack;
export const T31_Demon_Hunter_Vengeance_trinkets_SingleTargetRaid: string =
  T31DemonHunterVengeanceTrinketsSingleTargetRaid;
export const T31_Demon_Hunter_Vengeance_weapons_CouncilRaid: string =
  T31DemonHunterVengeanceWeaponsCouncilRaid;
export const T31_Demon_Hunter_Vengeance_weapons_MythicPlusLargePack: string =
  T31DemonHunterVengeanceWeaponsMythicPlusLargePack;
export const T31_Demon_Hunter_Vengeance_weapons_MythicPlusSmallPack: string =
  T31DemonHunterVengeanceWeaponsMythicPlusSmallPack;
export const T31_Demon_Hunter_Vengeance_weapons_SingleTargetRaid: string =
  T31DemonHunterVengeanceWeaponsSingleTargetRaid;
/* eslint-enable camelcase -- Enabling because the rest does not need to match simc. */

export const templates = [
  "T31_Demon_Hunter_Vengeance_Crafted_embellishments_CouncilRaid",
  "T31_Demon_Hunter_Vengeance_Crafted_embellishments_MythicPlusLargePack",
  "T31_Demon_Hunter_Vengeance_Crafted_embellishments_MythicPlusSmallPack",
  "T31_Demon_Hunter_Vengeance_Crafted_embellishments_SingleTargetRaid",
  "T31_Demon_Hunter_Vengeance_rings_CouncilRaid",
  "T31_Demon_Hunter_Vengeance_rings_MythicPlusLargePack",
  "T31_Demon_Hunter_Vengeance_rings_MythicPlusSmallPack",
  "T31_Demon_Hunter_Vengeance_rings_SingleTargetRaid",
  "T31_Demon_Hunter_Vengeance_trinkets_CouncilRaid",
  "T31_Demon_Hunter_Vengeance_trinkets_MythicPlusLargePack",
  "T31_Demon_Hunter_Vengeance_trinkets_MythicPlusSmallPack",
  "T31_Demon_Hunter_Vengeance_trinkets_SingleTargetRaid",
  "T31_Demon_Hunter_Vengeance_weapons_CouncilRaid",
  "T31_Demon_Hunter_Vengeance_weapons_MythicPlusLargePack",
  "T31_Demon_Hunter_Vengeance_weapons_MythicPlusSmallPack",
  "T31_Demon_Hunter_Vengeance_weapons_SingleTargetRaid",
] as const;
export type Template = (typeof templates)[number];
export const isTemplate = (s: unknown): s is Template =>
  templates.includes(s as Template);

const templateMapping: Record<Template, string> = {
  /* eslint-disable camelcase -- Disabling because this needs to match simc. */
  T31_Demon_Hunter_Vengeance_Crafted_embellishments_CouncilRaid,
  T31_Demon_Hunter_Vengeance_Crafted_embellishments_MythicPlusLargePack,
  T31_Demon_Hunter_Vengeance_Crafted_embellishments_MythicPlusSmallPack,
  T31_Demon_Hunter_Vengeance_Crafted_embellishments_SingleTargetRaid,
  T31_Demon_Hunter_Vengeance_rings_CouncilRaid,
  T31_Demon_Hunter_Vengeance_rings_MythicPlusLargePack,
  T31_Demon_Hunter_Vengeance_rings_MythicPlusSmallPack,
  T31_Demon_Hunter_Vengeance_rings_SingleTargetRaid,
  T31_Demon_Hunter_Vengeance_trinkets_CouncilRaid,
  T31_Demon_Hunter_Vengeance_trinkets_MythicPlusLargePack,
  T31_Demon_Hunter_Vengeance_trinkets_MythicPlusSmallPack,
  T31_Demon_Hunter_Vengeance_trinkets_SingleTargetRaid,
  T31_Demon_Hunter_Vengeance_weapons_CouncilRaid,
  T31_Demon_Hunter_Vengeance_weapons_MythicPlusLargePack,
  T31_Demon_Hunter_Vengeance_weapons_MythicPlusSmallPack,
  T31_Demon_Hunter_Vengeance_weapons_SingleTargetRaid,
  /* eslint-enable camelcase -- Enabling because the rest does not need to match simc. */
};
export const getTemplateByName = (template: Template): string =>
  templateMapping[template];

interface GetTemplateParams {
  profile: Profile;
  encounterType: EncounterType;
  generator: Generator | GeneratorName;
}
export const getTemplate = (params: GetTemplateParams): string | undefined => {
  const generator = isGeneratorName(params.generator)
    ? getGeneratorByName(params.generator)
    : params.generator;
  const possibleTemplateName = `${params.profile}_${
    generator.name
  }_${snakeToPascal(params.encounterType)}`;
  if (!isTemplate(possibleTemplateName)) {
    return undefined;
  }
  return getTemplateByName(possibleTemplateName);
};
