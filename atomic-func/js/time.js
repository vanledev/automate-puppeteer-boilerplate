function getCurrentDateTimeAsFileName(){
    const date = new Date().toLocaleString();
    
    const regex = /\D/g;
    const formattedDate = date.replace(regex, '_');
    return formattedDate;
}

async function limitTime(ms){
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            resolve('failure');
        },ms)
    })
}

const timeFn = {getCurrentDateTimeAsFileName, limitTime};



export default timeFn;

