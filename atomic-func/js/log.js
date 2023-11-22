import fs from 'fs';

async function logError({location, content}){
    console.log(content + '\n');
    fs.appendFileSync(location, content + '\n');
}


const logFn = {logError};
export default logFn;