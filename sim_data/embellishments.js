const gear = {
  "Flaring Cowl":
    "head=,id=193494,bonus_id=8836/8840/8902/8960/7936/9405/8846,ilevel=447",
  "Shadowflame Armor Patch (W)":
    "wrist=lifebound_bindings,id=193419,bonus_id=9379/8960,crafted_stats=32/36,gem_id=192945,ilevel=447",
  "Shadowflame Armor Patch (B)":
    "feet=lifebound_boots,id=193398,bonus_id=9379/8960,crafted_stats=32/36,ilevel=447",
  "Elemental Lariat":
    "neck=elemental_lariat,id=193001,bonus_id=8836/8840/8902/8960/8784/8782/9405/8790/8846/9365,gem_id=192945/192945/192945,crafted_stats=49/32,ilevel=447",
  "Toxic Thorn Footwraps": "feet=,id=193452,enchant_id=6613,ilevel=447",
  "Slimy Expulsion Boots": "feet=,id=193451,enchant_id=6613,ilevel=447",
  "Toxic Armor Patch":
    "wrist=lifebound_bindings,id=193419,bonus_id=8797/8960,crafted_stats=32/36,gem_id=192945,ilevel=447",
  "Spore Colony Shoulderguards":
    "shoulder=spore_colony_shoulderguards,id=204706,ilevel=447",
  "Infurious Footwraps of Indemnity":
    "feet=infurious_footwraps_of_indemnity,id=193455,enchant_id=6613,ilevel=447",
};

const keys = Object.keys(gear);

const combinationUtil = (arr, combos, startIdx, endIdx, curIdx, size) => {
  if (curIdx === size) {
    const pieces = [];
    for (let j = 0; j < size; j++) {
      pieces.push(combos[j]);
    }

    const gearNames = [...pieces].join("/");
    const gearStrings = pieces
      .map(
        (piece, idx) =>
          `profileset."${gearNames}"+=${gear[piece].replace(
            "trinket1",
            idx === 0 ? "trinket1" : "trinket2"
          )}`
      )
      .join("\n");
    console.log(`${gearStrings}\n`);
  }

  for (let i = startIdx; i <= endIdx && endIdx - i + 1 >= size - curIdx; i++) {
    combos[curIdx] = arr[i];
    combinationUtil(arr, combos, i + 1, endIdx, curIdx + 1, size);
  }
};
const printCombinations = (arr, size) => {
  const n = arr.length;
  const combos = new Array(size);
  combinationUtil(arr, combos, 0, n - 1, 0, size);
};

printCombinations(keys, 2);
