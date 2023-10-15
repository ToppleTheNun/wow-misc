import { expect, test } from "vitest";
import type { Gear } from "./combinations";
import { areNotSameUnique } from "./combinations";

test("areNotSameUnique", () => {
  const noUniqueId: Gear = {
    name: "Placeholder 1",
    slot: "main_hand",
    options: "",
  };
  const withUniqueId: Gear = {
    name: "Placeholder 2",
    slot: "main_hand",
    options: "",
    uniqueId: 1,
  };

  expect(
    areNotSameUnique({ slot1: noUniqueId, slot2: noUniqueId }),
  ).toBeTruthy();
  expect(
    areNotSameUnique({ slot1: noUniqueId, slot2: withUniqueId }),
  ).toBeTruthy();
  expect(
    areNotSameUnique({ slot1: withUniqueId, slot2: noUniqueId }),
  ).toBeTruthy();
  expect(
    areNotSameUnique({ slot1: withUniqueId, slot2: withUniqueId }),
  ).toBeFalsy();
});
