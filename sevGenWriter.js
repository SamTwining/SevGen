import { GetDict } from './sevGen.js';
import { 
    OpenExcel, 
    GetWorksheet, 
    WriteExcelFile, 
    WriteToRow, 
    SeverityCountObjToArr 
} from './utils/excel.js';
import { ParseSeverityDict } from './utils/sevList.js';
import fs from 'fs';

const dict = GetDict();
// Or download it and read it 
//const dict = fs.readFileSync('./my-json.json')

const rowMap = {
    emea: 2,
    nortam: 3,
    apac: 4,
    latam: 5,
    japan: 6,
    bermuda: 7,
    rh: 8, 
    ext: 11
}

const regionSeverityCountDict = ParseSeverityDict(dict);
const regions = Object.keys(regionSeverityCountDict);
const startCol = 'L';

async function WriteSeverities() {
    const workBook = await OpenExcel('./test.xlsx');
    const workSheet = GetWorksheet(workBook);

    for (let i = 0; i < regions.length; i++) {
        // Get the row we need for the current region
        const all = SeverityCountObjToArr(regionSeverityCountDict[regions[i]].all);
        const exp = SeverityCountObjToArr(regionSeverityCountDict[regions[i]].exp);

        const allValues = all.concat(exp);

        // Get the row we want to write to based on the region name
        const row = rowMap[regions[i]];

        WriteToRow(workSheet, startCol, row, allValues);
    }
    WriteExcelFile(workBook, './test.xlsx');
}

WriteSeverities().then((result) => {
    console.log('Done!');
}, (err) => {
    console.error(err);
});