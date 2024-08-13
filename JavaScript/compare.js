const xlsx = require("xlsx");
const path = require("path");
const fs = require("fs");

var fieldToCompare1 = "Created by";
var fieldToCompare2 = "Created by";
let file1 = getSheetData('sys_script_include.xlsx',fieldToCompare1);
let file2 = getSheetData('sys_script_include_pdi.xlsx',fieldToCompare2);

function getSheetData(fileName, field) {
  const workbook = xlsx.readFile(path.join(__dirname, fileName));

  // Get the first sheet name
  const sheetName = workbook.SheetNames[0];

  // Get worksheet
  const worksheet = workbook.Sheets[sheetName];

  const fieldName = field; // Replace 'FieldName' with the actual field name

  // Convert the worksheet to a JSON object
  const data = xlsx.utils.sheet_to_json(worksheet);

  // Extract the specified field from each row
  const specifiedFieldData = data.map((row) => row[fieldName]);

  return specifiedFieldData;
}
// Load the Excel file


function findUniqueValues(arrayToFilter) {
  //when calling the function pass in the name of the array to filter
  return arrayToFilter.filter(function (element, index, array) {
    return array.indexOf(element) === index;
  });
}

function findDifference(array1, array2) {
  // this compares two arrays and will find the difference between the two.
  //replace array1 and array2 values with the names of the arrys to pass in.
  return array1.filter(function (element) {
    return array2.indexOf(element) === -1;
  });
}
function saveToExcelFile(data, outputFileName) {
  let workbook = xlsx.utils.book_new();
  let newWorksheet = xlsx.utils.aoa_to_sheet(data.map(item => [item]));
  xlsx.utils.book_append_sheet(workbook, newWorksheet, 'Data');
  xlsx.writeFile(workbook, outputFileName);
}

let kraftUsers = findUniqueValues(file1);
let pdiUsers = findUniqueValues(file2);


saveToExcelFile(pdiUsers, "pdi-script-users.xlsx");
