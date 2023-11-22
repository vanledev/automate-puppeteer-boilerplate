function regexCaptureGroupItem({str, regex, groupNumber}){
    const matches = str.match(regex);
    
    return matches[groupNumber];
    
}
const regexFn = {regexCaptureGroupItem}

export default regexFn;