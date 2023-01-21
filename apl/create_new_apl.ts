import { writeFile } from "fs/promises";
import { join } from "path";
import { dedent } from "ts-dedent";
import { fileURLToPath } from "url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));

const argv = process.argv.slice(2);

const toSnakeCase = (str: string) =>
  str
    .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
    ?.map((x) => x.toLowerCase())
    ?.join("_");

const aplName = argv.join(" ");
if (!aplName) {
  console.error(`Invalid APL name provided: ${aplName}`);
  process.exit(1);
}

const aplNameSnakeCase = toSnakeCase(aplName);
if (!aplNameSnakeCase) {
  console.error("Could not convert APL name to snake_case");
  process.exit(1);
}

const aplCommentLine = `# ${aplName} APL #`;
const aplCommentLineComments = Array(aplCommentLine.length + 1).join("#");

const aplPlusDefinitionsCommentLine = `# ${aplName} APL plus definitions #`;
const aplPlusDefinitionsCommentLineComments = Array(
  aplPlusDefinitionsCommentLine.length + 1
).join("#");

const fileContents = dedent`
${aplCommentLineComments}
${aplCommentLine}
${aplCommentLineComments}

${aplPlusDefinitionsCommentLineComments}
${aplPlusDefinitionsCommentLine}
${aplPlusDefinitionsCommentLineComments}
`;

const pathToWriteFile = join(__dirname, `${aplNameSnakeCase}.txt`);
await writeFile(pathToWriteFile, fileContents, { encoding: "utf-8" });
