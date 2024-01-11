import * as dotenv from "dotenv"; 
import getAppRoot from "../../get-app-root.js";

function env(variable) {
  dotenv.config({path: getAppRoot() + '/atomic-func/env/.env'});
  return process.env[variable];
}
export default env;
