import helpersFn from './helpers.js';
import logFn from '../js/log.js';
import getAppRoot from '../../get-app-root.js';
import puppeteer from 'puppeteer';
import csvFn from '../csv/crud.js';
import timeFn from '../js/time.js';

async function onSucessRedirect(page) {
    page.on('response', async (res) => {

        if (res.request().method() == 'POST') {
            console.log(res.request().method());
            if (res.status() == 302) {


            }
        }


    });

}

async function sendForm({ browser, url, fields }) {
 try {

    const page = await browser.newPage();

    page.setDefaultNavigationTimeout(120000);
    try {
        await page.goto(url, { waitUntil: 'load',  timeout: 60000 });
        } catch(e){
            console.log(`${url} is too slow, trying again...`);
            await page.reload({  waitUntil: 'load', timeout: 60000 });
        }
    

    for (let input of fields.input) {

        
        
        await page.$eval(input.selector, (el, content) => { el.value = content }, input.content);

    }
    if (fields.button) {
        for (let button of fields.button) {
            const selector = await page.waitForSelector(button);
            await selector.click();
        }
    }


    if (fields.iframeInput) {
        for (let input of fields.iframeInput) {
            const myFrame = page.frames().find(frame => frame.name().includes(input.frameName));

            await myFrame.$eval(input.selector, (el, content) => { el.innerHTML = content }, input.content);

        }
    }


    const submitButton = await page.waitForSelector(fields.submit);
    await submitButton.click();
    return page;




 } catch (e){
console.log(e);
 }


}


const formFn = { sendForm }

export default formFn;