function findDifference(array1, array2) {
  // this compares two arrays and will find the difference between the two.
  //replace array1 and array2 values with the names of the arrys to pass in.
  return array1.filter(function (element) {
    return array2.indexOf(element) === -1;
  });
}

function findMatches(array1, array2) {
  // this compares two arrays and will find the elements that exist in both arrays.
  //replace array1 and array2 values with the names of the arrys to pass in.
  return array1.filter(function (element) {
    return array2.indexOf(element) === 1;
  });
}

function stringify(string) {
  //this function is for quickly converting JSON to a string.
  return gs.info(JSON.stringify(string));
}

function queryStringBuilder(fieldNameString, dataArray, separatorString) {
  /* Query string function is used to build a large query string from an array of values. 
  queryStringBuilder('role','=',userRoles,'^ORrole=');*/

  var queryString = fieldNameString + dataArray.join(separatorString);
  return queryString;
}

function findUniqueValues(arrayToFilter) {
  //when calling the function pass in the name of the array to filter
  return arrayToFilter.filter(function (element, index, array) {
    return array.indexOf(element) === index;
  });
}

function generateLink(path) {
  var instanceURL = gs.getProperty("glide.servlet.uri");
  var url = instanceURL + path;
  url = "'" + url + "'";
  var htmlLink = "<a href=" + url + ">Click Here</a>";
  return htmlLink;
}

generateLink("now/esg/workqueue");


//begin convertStringtoIntMiles
function convertStringtoIntMiles(input) {
  var units = [
    "mile",
    "miles",
    "m",
    "km",
    "kilometer",
    "kilometre",
    "kilometers",
    "kilometres",
    "feet",
    "ft",
  ];

  input = input.toLowerCase();
  if (input.match(/^\W/g)) {
    //match any non word character at the beginning of a string
    input = input.replace(/^\W/g, "");
  }
  if (input.match(/(\d+\s,\d+)|(\d+,\d+)/g)) {
    //match any digits with comma sepator with or without a space
    if (input.match(/\s/g)) {
      //find white space character
      input = input.replace(/\s/g, "");
    }

    input = parseInt(input.replace(",", ""));
  }

  if (input === "n/a") {
    input = 0;
  }
  if (input.match(/\d+/) === null) {
    input = 0;
  }

  for (var y = 0; y < units.length; y++) {
    var regex = new RegExp("(\\d+|\\d+\\s)(" + units[y] + ")", "g");
    var matches = input.match(regex);
    if (matches) {
      if (units[y] === "miles" || units[y] === "m" || units[y] === "mile") {
        input = parseInt(input);
      } else if (
        units[y] === "km" ||
        units[y] === "kilometer" ||
        units[y] === "kilometre" ||
        units[y] === "kilometers" ||
        units[y] === "kilometres"
      ) {
        input = (parseInt(input) / 1.609).toFixed(2);
      } else if (units[y] === "ft" || units[y] === "feet") {
        input = (parseInt(input) / 5280).toFixed(2);
      }
    }
  }
  if (input.match(/^\d+/)) {
    input = parseInt(input);
  }
  return input;
}
var input = "2 ,400";

var ouput = convertStringtoIntMiles(input);
/// end convertStringtoIntMiles

function appendListCollecctor(table, listCollectorFieldName, recordToAdd) {
  //add values to list collector
  var grTable = new GlideRecord(table);
  // query conditions
  grTable.query();
  while (grTable.next()) {
    var listCollectorValues = grTable.getValue(listCollectorFieldName).split(","); // split the comma separated string into an array
    listCollectorValues.push(recordToAdd); //append the new value to the array
    grTable.setValue(listCollectorFieldName, listCollectorValues.toString()); //conver the array back to a string
    grTable.update();
  }
}


function getDuplicates(table, field) {
  var dupRecords = [];
  var gaDupCheck = new GlideAggregate(table);
  gaDupCheck.addAggregate('COUNT', field);
  gaDupCheck.addNotNullQuery(field);
  gaDupCheck.groupBy(field);
  gaDupCheck.addHaving('COUNT', '>', 1);
  gaDupCheck.query();
  while (gaDupCheck.next()) {
      dupRecords.push(gaDupCheck[field].toString());
  }
  return dupRecords;
}
//name=0000010047^ORname=0000010048

var output = getDuplicates('cmn_cost_center', 'name');

function getDuplicateSys(array, field,table) {
  var output = [];
  var seperator = '^OR'+field+'=';
  var queryString = field+'=' + array.join(seperator);
  var gaDupSysCheck = new GlideRecord(table);
  gaDupSysCheck.addEncodedQuery(queryString);
  gaDupSysCheck.query();
  while (gaDupSysCheck.next()) {
      output.push(gaDupSysCheck.getValue('sys_id'));

  }
  return output;

}



(function runMailScript(current, template, email, email_action, event) {
  //gs.info("Email Script is called");
  var link = gs.getProperty('glide.servlet.uri') + 'now/sow/record/' + current.getTableName() + '/' + current.getUniqueValue();

  var buttonStyle = 'border: none; border-radius: 10px; color: white; padding: 15px 32px; text-align: center; text-decoration: none; display: inline-block; font-size: 16px; margin: 4px 2px; cursor: pointer;';
  var blueButtonStyle = buttonStyle + ' background-color: #008CBA;';

  template.print('<a href="' + link + '" style="' + buttonStyle + blueButtonStyle + '">View request</a><br/>');

})(current, template, email, email_action, event);