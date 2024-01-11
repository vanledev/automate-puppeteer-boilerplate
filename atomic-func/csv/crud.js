import * as XLSX from "xlsx/xlsx.mjs";
/* load 'fs' for readFile and writeFile support */
import * as fs from "fs";
XLSX.set_fs(fs);
import { createObjectCsvWriter as createCsvWriter } from "csv-writer";
import { parse } from "csv-parse";
import path from "path";
import read from "fs-readdir-recursive";
import replaceExt from "replace-ext";

async function convertRecursiveToCSV({ folder, exclude, ext }) {
  const files = read(folder, function (name, index, dir) {
    return !dir.includes(exclude);
  });

  files.forEach((file) => {
    if (path.extname(file) == ".xlsx") {
      sheetToCsv({
        inputFile: `${folder}/${file}`,
        outputFile: replaceExt(`${folder}/${file}`, ".csv"),
      });
    }
  });
}

// sheetToCsv({
//     inputFile: './input/spin/test.xlsx',
//     outputFile: './input/spin/test.csv'
// })
function sheetToCsv({ inputFile, outputFile }) {
  const worksheet = XLSX.readFile(inputFile);
  XLSX.writeFile(worksheet, outputFile, { bookType: "csv" });
  return;
}

async function writeMyCSV({ path, obj, header }) {
  // const obj = [
  //     {name: 'Bob',  lang: 'ko'},
  //     {name: 'Mary', lang: 'English'}
  // ];
  // const path = './test.csv';
  // const header =  [
  //     {id: 'name', title: 'NAME'},
  //     {id: 'lang', title: 'LANGUAGE'}
  // ]

  const csvWriter = createCsvWriter({ path, header, append: true });

  await csvWriter.writeRecords(obj);
  // console.log("Written")
  return 1;
}

// const res = await readMyCSV({ headers: ['link'], path: './input/links-pool/all-links.csv', isSkipFirstLine: false });
// console.log(res)
async function readMyCSV({ headers, path, isSkipFirstLine }) {
  const from_line = isSkipFirstLine ? 2 : 1;

  const records = [];
  const parser = fs.createReadStream(path).pipe(
    parse({
      // CSV output if any
      trim: true,
      from_line,
    })
  );

  for await (const record of parser) {
    // Work with each record

    let obj = {};
    headers.forEach((headerTitle, i) => {
      // bỏ qua cột ko cần
      if (record[i]) {
        // Bỏ qua ô rỗng
        obj[headerTitle] = record[i];
      }
    });
    if (Object.keys(obj).length !== 0) {
      // bỏ qua dòng rỗng
      records.push(obj);
    }
  }
  return records;
}
const csvFn = { convertRecursiveToCSV, writeMyCSV, readMyCSV };

export default csvFn;
