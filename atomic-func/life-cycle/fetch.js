import debug from "../debug/debug.js";
// wait for fetch response for too long  without receiving any response, we have to abort it. Because Using a promise race solution will leave the request hanging and still consume bandwidth in the background and lower the max allowed concurrent request being made while it's still in process.
async function fetchOrAbort(url, milisecond) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => {
    debug.err(
      `Can't access ${url}, waited for ${milisecond}ms but no response`
    );
    return controller.abort();
  }, milisecond);

  const res = await fetch(url, { signal: controller.signal });
  if (res) {
    clearTimeout(timeoutId);
    return res;
  }
}

export default fetchOrAbort;
