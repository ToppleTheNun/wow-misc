import {
  pairedGearCombinations,
  stringifyGearCombinations,
} from '../combinations/combinations';
import { gear } from '../gear/embellishments';

export const profilesetsGearPairs = pairedGearCombinations(gear);
export const profilesets = stringifyGearCombinations(profilesetsGearPairs);
