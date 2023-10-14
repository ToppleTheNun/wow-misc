import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { Slot } from "../utils/combinations";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const actors = ["t31_vengeance"] as const;
export type Actor = (typeof actors)[number];

export const actor = (name: Actor): string =>
  readFileSync(join(__dirname, `${name}.simc`), { encoding: "utf-8" });

export const actorWithoutSlots = (name: Actor, slots: Slot[]) =>
  actor(name)
    .split("\n")
    .filter((line) => !slots.some((slot) => line.startsWith(slot)))
    .join("\n");
