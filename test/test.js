console.log("here's test file");
import createDebug from "debug";

 let debug = createDebug("myapp:server");
debug(
  // Example usage
  "This is a debug message"
);

import env from "../atomic-func/env/env.js";
console.log(env('STATUS'))
