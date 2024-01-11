import * as dotenv from "dotenv"; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import

function env(variable) {
  dotenv.config();
  return process.env[variable];
}
export default env;
