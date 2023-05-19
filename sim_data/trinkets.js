const gear = {
  "Elementium Pocket Anvil":
    "trinket1=elementium_pocket_anvil,id=202617,bonus_id=4800/4786/1498",
  "Dragonfire Bomb Dispenser":
    "trinket1=dragonfire_bomb_dispenser,id=202610,bonus_id=4800/4786/1498",
  "Screaming Black Dragonscale":
    "trinket1=screaming_black_dragonscale,id=202612,bonus_id=4800/4786/1498",
  "Beacon to the Beyond":
    "trinket1=beacon_to_the_beyond,id=203963,bonus_id=4800/4786/1498",
  "Neltharion's Call to Chaos":
    "trinket1=neltharions_call_to_chaos,id=204201,bonus_id=4800/4786/1498",
  "Mark of Dargrul": "trinket1=mark_of_dargrul,id=137357,ilevel=447",
  "Lingering Sporepods": "trinket1=lingering_sporepods,id=159626,ilevel=447",
  "Harlan's Loaded Dice": "trinket1=harlans_loaded_dice,id=155881,ilevel=447",
  "Igneous Flowstone":
    "trinket1=igneous_flowstone,id=203996,bonus_id=4800/4786/1498",
  "Storm-Eater's Boon":
    "trinket1=stormeaters_boon,id=194302,bonus_id=6652/7981/1498/8767",
  "Manic Grieftorch":
    "trinket1=manic_grieftorch,id=194308,bonus_id=7981/6652/1498/8767",
  "Heroic Storm-Eater's Boon": "trinket1=stormeaters_boon,id=194302,ilevel=408",
  "Drogbar Rocks (411)": "trinket1=drogbar_rocks,id=204810,ilevel=411",
  "Drogbar Rocks (437)": "trinket1=drogbar_rocks,id=204810,ilevel=437",
  "Heart of Thunder": "trinket1=heart_of_thunder,id=133246,ilevel=447",
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
