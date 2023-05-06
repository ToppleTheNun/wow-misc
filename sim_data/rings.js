const gear = {
  "Seal of Diurna's Chosen":
    "finger1=seal_of_diurnas_chosen,id=195480,bonus_id=4800/4786/1498,gem_id=192952,enchant_id=6556",
  "Onyx Annulet":
    "finger1=onyx_annulet,id=203460,bonus_id=1491,gem_id=204011/204027/204029,gem_bonus_id=9369:1472/9369:1472/9369:1472,enchant_id=6556",
  "Onyx Impostor's Birthright":
    "finger1=onyx_impostors_birthright,id=204398,enchant_id=6556,ilevel=450",
  "Shard of Titanic Insight":
    "finger1=,id=192999,crafted_stats=32/36,ilevel=447",
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
      .map((piece) => `profileset."${gearNames}"+=${gear[piece]}`)
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
