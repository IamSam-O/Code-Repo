const xlsx = require('xlsx');
const path = require('path');
var fieldToCompare1 = 'Created by';
var fieldToCompare2 = 'Created by';

function getSheetData(fileName) {
    const workbook = xlsx.readFile(path.join(__dirname, fileName));
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const data = xlsx.utils.sheet_to_json(worksheet);
    return data;
}

let file1 = getSheetData('sys_script_include.xlsx');
let file2 = getSheetData('sys_script_include_pdi.xlsx');

function findDifference(array1, array2, fieldName1,fieldName2) {
    const array2FieldValues = array2.map(item => item[fieldName2]); // Correctly access the property
    return array1.filter(item => !array2FieldValues.includes(item[fieldName1]));
}

function saveToExcelFile(data, outputFileName) {
    // Create a new workbook and add a new sheet
    let newWorkbook = xlsx.utils.book_new();
    let newWorksheet = xlsx.utils.json_to_sheet(data);

    // Append the sheet to the workbook
    xlsx.utils.book_append_sheet(newWorkbook, newWorksheet, 'Differences');

    // Write the workbook to a file
    xlsx.writeFile(newWorkbook, path.join(__dirname, outputFileName));
}

const differences = findDifference(file1, file2,fieldToCompare1,fieldToCompare2);

// Save the differences, along with their associated row data, to an Excel file named 'differences.xlsx'
saveToExcelFile(differences, 'differences.xlsx');
