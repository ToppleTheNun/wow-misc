import { expect, test } from 'vitest';
import { getTemplate, getTemplateByName } from './index';

test('getTemplateByName finds something', () => {
  expect(
    getTemplateByName(
      'T31_Demon_Hunter_Vengeance_embellishments_SingleTargetRaid',
    ),
  ).toBeTruthy();
});

test('getTemplate finds something', () => {
  expect(
    getTemplate({
      profile: 'T31_Demon_Hunter_Vengeance',
      encounterType: 'singleTargetRaid',
      generator: 'embellishments',
    }),
  ).toBeTruthy();
});
