import fetch from "node-fetch";
import debug from "../debug/debug.js";

async function goto(page, url) {
  try {
    const res = await fetchOrAbort(url, 30000);

    if (res.ok) {
      await page.goto(url);
      return page;
    } else {
      debug.err(
        `Can't access ${url}, error: ${res.status} - ${res.statusText}`
      );
    }
  } catch (e) {
    debug.err(`Can't access ${url}, error: ${e}`);
  }
}
export default goto;
