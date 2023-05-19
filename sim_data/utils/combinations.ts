export type Gear = Record<string, string>;

export const combinationUtil = (
  gear: Gear,
  keys: string[],
  combos: string[],
  startIdx: number,
  endIdx: number,
  curIdx: number,
  size: number
): string => {
  let output = "";

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
    output += `${gearStrings}\n\n`;
  }

  for (let i = startIdx; i <= endIdx && endIdx - i + 1 >= size - curIdx; i++) {
    combos[curIdx] = keys[i];
    output += combinationUtil(
      gear,
      keys,
      combos,
      i + 1,
      endIdx,
      curIdx + 1,
      size
    );
  }

  return output;
};

export const printCombinations = (gear: Gear, size: number): string => {
  const keys = Object.keys(gear);
  const n = keys.length;
  const combos = new Array<string>(size);
  return combinationUtil(gear, keys, combos, 0, n - 1, 0, size);
};
