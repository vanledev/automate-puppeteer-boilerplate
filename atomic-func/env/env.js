import * as dotenv from "dotenv"; 
import getAppRoot from "../../get-app-root.js";

function env(variable) {
  dotenv.config({path: getAppRoot() + '/atomic-func/env/.env'});
  return process.env[variable];
}
export default env;
// - "dotenv" package also tries to retrieve variables set by command line first, if the variable is not set, the value from .env will be used