import getAppRoot from "../get-app-root.js";
import main from "./main.js";
import debug from "../atomic-func/debug/debug.js";
import logCatch from "./catch.js";

try {
  main();
} catch {
  logCatch();
} finally {
  process.exit();
}
