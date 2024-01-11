import createDebug from "debug";
import chalk from 'chalk'
let dev = createDebug("dev");
let debug = { dev };
export default debug;

// debug.dev("Message for dev",33333)
// console.log(chalk.red("haha",44))