import loginOne from "./run/login-one-acc.js";
import puppeteer from "puppeteer";
import convertInput from "./run/convert-input.js";

main()
async function main(){
  console.log("Start opening browser, please wait...");
  process.setMaxListeners(Infinity);
  const accounts = await convertInput()
 
  loginOne(accounts[0])


 

  // process.exit();
}

// const browser = await puppeteer.launch({
//   headless: false,
//   args: ["--start-maximized"],
// });
// let page = await browser.newPage();

// page.setDefaultNavigationTimeout(120000);
// const url = 'gmail.com'
// await page.goto(url, { waitUntil: "domcontentloaded" });

// await page.waitForNavigation({ waitUntil: "domcontentloaded" });

// const lastPost = await page.waitForSelector("[id$=hplChiTiet_0]");

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
//   page = await formFn.sendForm({ browser, url, fields, fileName });
// let afterSendFn = whichAfterSendFn(url);
// const pageDoneAfterSend = await afterSendFn({ page, fileName, url });
// if (pageDoneAfterSend) {
//   await pageDoneAfterSend.close();
//   console.log(`Sent - ${helpersJs.getHomePage(url)} - ${postTitle}`);
// }

// await browser.close();

// process.exit();