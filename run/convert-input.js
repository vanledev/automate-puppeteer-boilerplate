import csvFn from '../atomic-func/xlsx/crud.js'
import getAppRoot from '../get-app-root.js'

async function convertInput(){
    const converted =   csvFn.convertRecursiveToCSV({
        inputPath: getAppRoot() + '/user/input',
        outputPath: getAppRoot() + '/storage/convert/csv',
        exclude: null
    })
     
    if (!converted){
        console.log("Can't convert xlsx to csv")
        return false;
    }
    const lines = await csvFn.readMyCSV({
        headers: ['name', 'password'],
        path: getAppRoot() + '/storage/convert/csv/acc.csv',
        isSkipFirstLine: true
    })
    return lines

}
 

export default convertInput