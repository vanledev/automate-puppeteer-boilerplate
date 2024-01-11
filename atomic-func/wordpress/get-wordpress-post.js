import fs from "fs";
import helpers from "../js/helpers.js";
import getAppRoot from "../../get-app-root.js";
import pLimit from "p-limit";
import puppeteer from "puppeteer";
import readtxt from "../../atomic-func/js/readtxt.js";
import logFn from "../js/log.js";
import csvFn from "../csv/crud.js";

async function getAllWordpressPost(errorLogPath) {
  const folder = `${process.cwd()}/input/wordpress/`;
  const cre = readtxt({
    acc: folder + "acc",
    password: folder + "password",
    loginURL: folder + "loginURL",
    postURL: folder + "postURL",
  });
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
  });
  let page = await browser.newPage();
  page.setDefaultNavigationTimeout(120000);

  page = await login({
    loginUrl: cre["loginURL"],
    acc: cre["acc"],
    password: cre["password"],
    errorLogPath,
    page,
  });

  let postList = await csvFn.readMyCSV({
    headers: ["postID"],
    path: `${getAppRoot()}/input/wordpress/wordpress-post-list.csv`,
    isSkipFirstLine: true,
  });
  postList = postList.map((obj) => obj.postID);

  const limit = pLimit(1);
  const promises = postList.map((postID) =>
    limit(() => getOnePost({ page, postID, errorLogPath }))
  );

  const status = await Promise.allSettled(promises);

  if (status) {
    console.log("Get all WP Posts");
    process.exit();
    return 1;
  }
}

async function login({ loginUrl, acc, password, errorLogPath, page }) {
  try {
    await page.goto(loginUrl, { waitUntil: "load" });
  } catch (e) {
    try {
      await page.reload({ waitUntil: "load" });
    } catch (e) {
      console.log("Wordpress site is too slow, pls try again");
      process.exit();
    }
  }
  await page.$eval(
    "[name=log]",
    (el, acc) => {
      el.value = acc;
    },
    acc
  );

  await page.$eval(
    "[name=pwd]",
    (el, password) => {
      el.value = password;
    },
    password
  );

  const rememberMe = await page.waitForSelector("[name=rememberme]");
  await rememberMe.click();
  const submitButton = await page.waitForSelector("[type=submit");
  await submitButton.click();
  await page.waitForTimeout(10000);

  return page;
}

async function getOnePost({ page, postID, errorLogPath }) {
  const folder = getAppRoot() + "/input/wordpress/posts";

  const entryUrl = getWordpressEntryUrl(postID);
  try {
    await page.goto(entryUrl, { waitUntil: "load" });
  } catch (e) {
    try {
      await page.reload({ waitUntil: "load" });
    } catch (e) {
      console.log("Wordpress site is too slow");
    }
  }
  try {
    const textOfInput = await page.evaluate(
      () => document.querySelector("[name=post_title]").value
    );
    fs.writeFileSync(
      `${folder}/${postID}-title.txt`,
      helpers.stripWrongHTMLEntities(textOfInput)
    );

    const textOfBody = await page.evaluate(
      () => document.querySelector("textarea.wp-editor-area").textContent
    );
    fs.writeFileSync(
      `${folder}/${postID}-content.txt`,
      helpers.stripWrongHTMLEntities(textOfBody)
    );
    console.log(`Done saving post - ${textOfInput}`);
  } catch (e) {
    logFn.logError({
      location: `${process.cwd()}/output/get-posts/${errorLogPath}.txt`,
      content: `Can't get post number ${postID}`,
    });
  } finally {
    return 1;
  }
}

function getWordpressEntryUrl(postID) {
  const folder = `${process.cwd()}/input/wordpress/`;
  const cre = readtxt({
    postURL: folder + "postURL",
  });
  return cre["postURL"].replace("postID", postID);
}

export default getAllWordpressPost;
