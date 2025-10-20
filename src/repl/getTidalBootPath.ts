import * as fs from "fs";
import * as path from "path";
import * as os from "os";
import * as child_process from "child_process";
import { info } from "./logger";

const getGhciBasePath = () => {
  return path.join(os.homedir(), ".ghcup", "bin");
};

export const getTidalBootPath = () => {
  const ghciBasePath = getGhciBasePath();
  const command = `${path.join(ghciBasePath, "ghc-pkg")} field tidal data-dir`;
  const dataDir = child_process
    .execSync(command)
    .toString("utf8")
    .replace("data-dir: ", "")
    .trim();

  const packagePath = path.join(dataDir, "BootTidal.hs");

  info(`Using default Tidal boot file from package path: "${packagePath}"`);
  return packagePath;
};
