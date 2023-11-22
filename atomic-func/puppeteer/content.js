import fs from 'fs';
import getAppRoot from '../../get-app-root.js';

function createFields(postID) {
    const folder = `${getAppRoot()}/options/`;
    const content = fs.readFileSync(`${folder}/wordpress/posts/${postID}-content.txt`, 'utf8');
    const title = fs.readFileSync(`${folder}/wordpress/posts/${postID}-title.txt`, 'utf8');
    const yourName = fs.readFileSync(`${folder}/your-name.txt`,'utf8');
    return {
        input: [

            {
                selector: 'input[name$="HoTen"]',
                content: yourName
            },
            {
                selector: 'input[name$="TieuDe"]',
                content: title
            }],
        iframeInput: [
            {
                frameName: 'designEditor',
                selector: 'body',
                content: content

            }
        ],
        // , button : [
        // '[id$=htmlModeTab]'
        // ],
        submit: '[name$="DatCH"]'
        
    }

}


const fieldFn = { createFields };
export default fieldFn;