import debug from "../debug/debug.js";
// wait for fetch response for too long  without receiving any response, we have to abort it. Because Using a promise race solution will leave the request hanging and still consume bandwidth in the background and lower the max allowed concurrent request being made while it's still in process.

// const url = "https://web.telegraddddm.org/a/#-1001144740753";
// fetchOrAbort(url, 10000);
async function fetchOrAbort(url, milisecond) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => {
    debug.err(
      `Can't access ${url}, waited for ${milisecond}ms but no response`
    );
    return controller.abort();
  }, milisecond);

  try {
    const res = await fetch(url, { signal: controller.signal });
    if (res) {
      return res;
    }
  } catch (e) {
    debug.err(`Can't access ${url}, error: ${e}`);
  } finally {
    clearTimeout(timeoutId);
  }
}

export default fetchOrAbort;
