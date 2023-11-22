
async function getCookiesString(cookies){
    const arr = cookies.map( cookie => `${cookie.name}=${cookie.value}` );
    return arr.join(';')

}

async function getCookies(){
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();
     await login(page,loginOptions);
    await saveCookies(page,"./options/cookies.txt");
    
}



function getHomePage(url){
        const matches = url.match(/(http|https):\/\/([^\/]+)\//);
    
        const domain = matches[2];
       let deleteWww = domain.replace('www.','');
        
        return deleteWww;
}

function getNeededCookiesFromHeader(cookiesFromHeader){
    const neededCookiesProperties = ['JSESSIONID'];
   
    
    const cookie2=cookiesFromHeader.map(item=>item.split(';')[0] );
    const cookie3 = cookie2.map(item=>item.split('='))
    const cookie4 = cookie3.filter(item=> neededCookiesProperties.includes(item[0]))
    
    
    
    return  cookie4[0][1];
}


function displayDateTime(){
    const nowInMinus11 = Date.now() - 11*60*60*1000;
    const dateObj  = new Date(nowInMinus11);
    
    
    const month = dateObj.getMonth();
    const year = dateObj.getFullYear() ;
    const date = dateObj.getDate();
    const hour = dateObj.getHours();
    const minute = dateObj.getMinutes();
    return {date, month,year,hour,minute};
}


import logFn from '../js/log.js';

import getAppRoot from '../../get-app-root.js';

async function typingStuff(page,elementHandle,text){
    
    await elementHandle.focus();
    await page.keyboard.down("ControlLeft");
    await page.keyboard.press("A");
    await page.keyboard.up("ControlLeft");
    await elementHandle.type(text);
    
}
async function copyingStuff(page,elementHandle){
    await elementHandle.focus();
    await page.keyboard.down("ControlLeft");
    await page.keyboard.press("A");
    await page.keyboard.press("C");
    await page.keyboard.up("ControlLeft");
   
}
function getLastFrame(){
    const iframes =  [...document.querySelectorAll("iframe")];
    const count = iframes.length;
    const last = iframes[count-1];
    return last;
}

async function clickTilNoMore(page, selector){
    let prev = await page.$$(selector   )
    while (prev.length> 0){
            for (x of prev){
                await x.click();
            }
         prev = await page.$$(selector)
         
     }
    
}

async function collectCookies({page, location}){
    await page.waitForNavigation({waitUntil: 'domcontentloaded'});
                    
    cookie = await page.cookies();
    writeFileSync(location,JSON.stringify(cookie));
    
}    


const helpersFn = {getCookiesString, typingStuff};
export default helpersFn;
