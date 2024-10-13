import puppeteer from "puppeteer-extra";
import StealthPlugin  from 'puppeteer-extra-plugin-stealth';
puppeteer.use(StealthPlugin())

async function loginOne(acc) {
    const browser = await puppeteer.launch({
        headless: false,
        args: ["--start-maximized",
        //    '--proxy-server=http://154.36.110.199:6853'
        ],
    });
    let page1 = await browser.newPage();
    // await page.authenticate({
    //     username: 'lmzbxveo',  // replace with your proxy username
    //     password: '4f1x4w8drc1i'   // replace with your proxy password
    //   });

    page1.setDefaultNavigationTimeout(120000);
    const url1 = 'https://www.bathandbodyworks.com/p/a-thousand-wishes-body-wash-028005114.html'
    await page1.goto(url1, { waitUntil: "domcontentloaded" });

    let page2 = await browser.newPage();    
    const url2 = 'https://accounts.google.com/v3/signin/identifier?continue=https%3A%2F%2Fmail.google.com%2Fmail%2F&ifkv=ARpgrqf1VRBPayRn0hcW_krR4BSAlHiDDIiTJkeeT4jCnmC-kCzPAYw-YMbLpb11papJMlMlcx5rrw&rip=1&sacu=1&service=mail&flowName=GlifWebSignIn&flowEntry=ServiceLogin&dsh=S1276968218%3A1728818843774125&ddm=0'
    await page2.goto(url2, { waitUntil: "domcontentloaded" });

    // await page.waitForNavigation({ waitUntil: "domcontentloaded" });
    // await page.$eval('input[type="email"]', (element, accName) => {
    //     element.value = accName;
    //     return element.value
    // }, acc.name)
    // await page.$eval('form', (form) => {
    //     form.submit()
    //     return form;
    // })

}
export default loginOne