import { readdir } from "fs/promises";
import { dirname, join } from "path";
import { fileURLToPath, pathToFileURL } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const findGenerators = async () => {
  const pathToFiles = join(__dirname, "generators");

  try {
    const dirContents = await readdir(pathToFiles);
    return dirContents
      .filter((file) => file.endsWith(".ts"))
      .map((file) => join(pathToFiles, file));
  } catch (e) {
    return [];
  }
};

const generators = await findGenerators();

for await (const generator of generators) {
  await import(pathToFileURL(generator).href);
}
