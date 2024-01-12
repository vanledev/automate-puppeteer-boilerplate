import puppeteer from "puppeteer";
import goto from "./goto.js";

console.log("Start opening browser, please wait...");
process.setMaxListeners(Infinity);

const browser = await puppeteer.launch({
  headless: false,
  args: ["--start-maximized"],
});
let page = await browser.newPage();
await page.evaluate(() => {
  window.onbeforeunload = null;
});

page.setDefaultNavigationTimeout(120000);
const url = " https://web.telegraddddm.org/a/#-1001144740753";

await goto(page, url);
 
await page.goto(url, { waitUntil: "domcontentloaded" });
await page.waitForSelector("button");
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
await page.waitForSelector("input#sign-in-phone-number");
await page.$eval(
  "input#sign-in-phone-number",
  (el, content) => {
    el.innerHTML = content;
  },
  "+84375622079"
);

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
