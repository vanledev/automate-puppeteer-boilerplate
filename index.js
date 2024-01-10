import puppeteer from "puppeteer";

console.log("Start opening browser, please wait...");
process.setMaxListeners(Infinity);

const browser = await puppeteer.launch({
  headless: false,
  args: ["--start-maximized"],
});
let page = await browser.newPage();

page.setDefaultNavigationTimeout(120000);
const url = " https://web.telegram.org/a/#-1001144740753";

await page.goto(url, { waitUntil: "load" });

await page.waitForNavigation({ waitUntil: "load" });
console.log("done wait for navigation");
const phone = await page.waitForSelector("button");
console.log("loaded", phone);
await page.click("button");
// const text = await page.evaluate((el) => {
//   return el.textContent;
// }, lastPost);
// const title = await page.evaluate(() => {
//   return document.querySelector(".entry h2").textContent;
// });

// const myFrame = page
//   .frames()
//   .find((frame) => frame.name().includes(input.frameName));

// await myFrame.$eval(
//   input.selector,
//   (el, content) => {
//     el.innerHTML = content;
//   },
//   input.content
// );

// await page.setContent(html);

// await dialog.dismiss();

// await page.click('[id$="TroVe"]');

// const fields = contentFn.createFields(postID);
// let page = await formFn.sendForm({ browser, url, fields, fileName });
// let afterSendFn = whichAfterSendFn(url);
// const pageDoneAfterSend = await afterSendFn({ page, fileName, url });
// if (pageDoneAfterSend) {
//   await pageDoneAfterSend.close();
//   console.log(`Sent - ${helpersJs.getHomePage(url)} - ${postTitle}`);
// }

// await browser.close();
// process.exit();
