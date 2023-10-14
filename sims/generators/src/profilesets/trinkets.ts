import {
  pairedGearCombinations,
  stringifyGearCombinations,
} from '../combinations/combinations';
import { gear } from '../gear/trinkets';

export const profilesetsGearPairs = pairedGearCombinations(gear);
export const profilesets = stringifyGearCombinations(profilesetsGearPairs);
