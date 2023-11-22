import fs from 'fs';

function getWPPostIDs(){
    const path = `${process.cwd()}/options/wordpress/wordpress-post-list.csv`;
    const arr = fs.readFileSync(path,'utf8').split('\r\n');
    const nonEmptyArr = arr.filter((item)=>item)
    return nonEmptyArr
  
    
}

function getTitleAndContent(postID){
    const title = fs.readFileSync(`${process.cwd()}/options/wordpress/posts/${postID}-title.txt`,'utf8');
    const content = fs.readFileSync(`${process.cwd()}/options/wordpress/posts/${postID}-content.txt`,'utf8');
    return {title, content};
}
const wpHelpers = {getWPPostIDs, getTitleAndContent};
export default wpHelpers;