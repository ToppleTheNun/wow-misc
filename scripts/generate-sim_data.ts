import spawnAsync from "@expo/spawn-async";
import { readdir } from "fs/promises";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const listConfigFiles = async () => {
  const pathToFiles = join(__dirname, "..", "sim_data");

  try {
    const dirContents = await readdir(pathToFiles);
    return dirContents
      .filter((file) => file.endsWith(".ts"))
      .map((file) => join(pathToFiles, file));
  } catch (e) {
    return [];
  }
};

const configFiles = await listConfigFiles();

for await (const configFile of configFiles) {
  await spawnAsync("pnpm", ["exec", "tsx", configFile]);
}
