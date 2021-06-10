import ExcelJS from 'exceljs';

const numFormat = '#,###;#,###;0';

function GetNextCharacter(c) {
    return String.fromCharCode(c.charCodeAt(0) + 1);
}

async function OpenExcel(filename) {
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(filename);

    return workbook;
}

function GetWorksheet(workbook, name) {
    return workbook.getWorksheet(name || 1);
}

async function WriteExcelFile(workbook, filename) {
    await workbook.xlsx.writeFile(filename);
}

function WriteToCell(worksheet, col, row, value) {
    const cell = worksheet.getCell(`${col}${row}`);
    cell.value = value;
    cell.numFmt = numFormat;
}

function WriteToRow(worksheet, colStart, row, values) {
    let col = colStart;
    for(let i = 0; i < values.length; i++) {
        WriteToCell(worksheet, col, row, values[i]);
        col = GetNextCharacter(col);
    }
    return col;
}

function SeverityCountObjToArr(severityCountObj) {
    return [ severityCountObj.critical, severityCountObj.severe, severityCountObj.moderate ];
}

export { GetNextCharacter, OpenExcel, GetWorksheet, WriteExcelFile, WriteToCell, WriteToRow, SeverityCountObjToArr };