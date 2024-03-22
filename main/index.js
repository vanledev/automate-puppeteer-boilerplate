import quickstart from "../atomic-func/cheerio/quickstart.js";
import debug from "../atomic-func/debug/debug.js";


try {
  checkInput();
  debug.clearLog();
  quickstart();
} catch (e) {
  debug.err(e);
 
} finally {
  // Close db if needed
  // exit process. When you run it as a script and it hangs when "done", it means node still has callbacks registered waiting for events. Node doesn't know that those events won't fire anymore. You can either just call process.exit()  if you know it's time to exit, or you can explicitly  close/unbind/disconnect everything (network connections, db connections,   etc). If you properly close everything, node should then exit.
  process.exit();
}
 