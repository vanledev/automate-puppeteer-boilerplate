import createDebug from "debug";
import chalk from "chalk";
import fs from "fs";

import getAppRoot from "../../get-app-root.js";

async function err(content) {
  console.log(chalk.bold.red(content + "\n"));
  fs.appendFileSync(getAppRoot() + "/output/log.txt", content + "\n");
}
async function clearLog() {
  console.log(chalk.bold.green("Clear log file" + "\n"));
  fs.writeFileSync(getAppRoot() + "/output/log.txt", "");
}
let dev = createDebug("dev");
let debug = { dev, err, clearLog };
export default debug;

// debug.dev(chalk.blue("Message for dev",33333))
// console.log(chalk.red("haha",44))
