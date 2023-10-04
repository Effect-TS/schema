import * as Fs from "node:fs";

(JSON.parse(Fs.readFileSync("package.json")).files ?? [])
  .filter((_) => _ !== "src")
  .forEach((file) => {
    Fs.rm(file, { recursive: true, force: true }, () => {});
  });
