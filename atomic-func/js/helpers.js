import fs from 'fs';
import regexFn from './regex.js';
import {decode, encode} from 'html-entities';

function appendCSV(data){
  fs.appendFileSync('./data.csv',data);
}
function getWPPostIDs(){
  
let postListRaw = fs.readFileSync(`${process.cwd()}/options/wordpress/wordpress-post-list.csv`, 'utf8').split('\r\n');
const postList = postListRaw.filter(item=>item !== '');
return postList;
}
      
function getNeededCookiesFromHeader(cookiesFromHeader){
    
   
    
  const cookies=cookiesFromHeader.map(item=>item.split(';')[0] );
  return cookies.join(';');
  
}


function displayDateTime(){
  const nowInMinus11 = Date.now() - 18*60*60*1000;
  const dateObj  = new Date(nowInMinus11);
  
  
  const month = dateObj.getMonth();
  const year = dateObj.getFullYear() ;
  const date = dateObj.getDate();
  const hour = dateObj.getHours();
  const minute = dateObj.getMinutes();
  // console.log(date, month,year,hour,minute)
  return {date, month,year,hour,minute};
}

// console.log(getURLPrefix('http://benhvienyhoccotruyencantho.vn/H%E1%BB%8Fi%C4%90%C3%A1p/tabid/2485/ctl/Add_CauHoi/mid/7792/Default.aspx'));


function getURLPrefix(url){
  
 return regexFn.regexCaptureGroupItem({
   str: url,
   regex: /(.+)(\/Default)/,
   groupNumber: 1
 })
  
  
}


function retrieveSavedCookies(homepage){
  const arr = JSON.parse(readFileSync( getAppRoot() + `/liferay/cookies/${homepage}.txt`))
  const obj = {}
  arr.forEach(item=>{
      obj[item[0]] = item[1]
  })
  return obj;
  
}
function stripWrongHTMLEntities(str){
  const regex = /&.*?;/g;
  
  const matches =  str.match(regex);
  let uniqueItems = [...new Set(matches)];
  
  if (uniqueItems.length === 0){
    return str;
  }
  for (let entity of uniqueItems){
      const regex = new RegExp(`${entity}`,'g');
      
      str = str.replace(regex, decode(entity));
  }
  
  return str;
  
}

function stripNonDigit(str){
  const regex = /\D/g;
  const str2 =  str.replace(regex,'')
  return str2;
}

function getHomePage(url){
  try { 
      const matches = url.match(/(http|https):\/\/([^\/]+)\//);
  
      const domain = matches[2];
     let deleteWww = domain.replace('www.','');
     
      return deleteWww;
  }catch(e){
    return '';
      
  }
  
}
function txtToArr(path){
  const arr = fs.readFileSync(path,'utf8').split('\r\n');
  const nonEmptyArr = arr.filter((item)=>item)
  return nonEmptyArr
}

const helpersFn = {getURLPrefix, getWPPostIDs,stripNonDigit , txtToArr,stripWrongHTMLEntities, getHomePage};
export default  helpersFn;

