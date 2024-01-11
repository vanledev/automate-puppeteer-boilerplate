import fetch from "node-fetch";
import debug from "../debug/debug.js";

async function goto(page, url) {
  try {
    const res = await fetch(url);

    if (res.status == 200) {
      await page.goto(url);
      return page;
    }
  } catch (e) {
    debug.err(`Can't access ${url}, error: ${e}`);
  }
}
export default goto;
