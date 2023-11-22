import cheerio from 'cheerio';

async function getElementHref({text, selector}){
    const $ = cheerio.load(text);
    const cheerioElement = $(selector);
    return cheerioElement.attr('href');


}

async function getElementText({text, selector}){
    const $ = cheerio.load(text);
    const cheerioElement = $(selector);
    return cheerioElement.text();


}

async function getDocTitle(text){
    const $ = cheerio.load(text);
    const cheerioElement = $('title');
    return cheerioElement.text();


}

function getTitleAndHref(text) {
    const $ = load(text);
    const cheerioElements = $('.entry-content .entry-title a');
    let arr = []
    cheerioElements.each((index, ele) => {
        let title = $(ele).text();
        let href = $(ele).attr('href')

        regex = /(.+)(\?)/;
        let href2 = href.match(regex)[1]

        regex2 = /(.+)(\;jsessionid)/
        if (href2.includes('jsessionid')) {
            href2 = href2.match(regex2)[1];
        }


        arr.push([title, href2])
    });
    return arr;

}


const helpers = {getElementHref, getElementText, getDocTitle};
export default helpers;