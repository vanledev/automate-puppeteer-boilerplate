import fs from "fs";
import regexFn from "./regex.js";
import { decode, encode } from "html-entities";



function stripWrongHTMLEntities(str) {
    const regex = /&.*?;/g;
  
    const matches = str.match(regex);
    let uniqueItems = [...new Set(matches)];
  
    if (uniqueItems.length === 0) {
      return str;
    }
    for (let entity of uniqueItems) {
      const regex = new RegExp(`${entity}`, "g");
  
      str = str.replace(regex, decode(entity));
    }
  
    return str;
  }
  
  function stripNonDigit(str) {
    const regex = /\D/g;
    const str2 = str.replace(regex, "");
    return str2;
  }
  
  function getHomePage(url) {
    try {
      const matches = url.match(/(http|https):\/\/([^\/]+)\//);
  
      const domain = matches[2];
      let deleteWww = domain.replace("www.", "");
  
      return deleteWww;
    } catch (e) {
      return "";
    }
  }
  function txtToArr(path) {
    const arr = fs.readFileSync(path, "utf8").split("\r\n");
    const nonEmptyArr = arr.filter((item) => item);
    return nonEmptyArr;
  }
  