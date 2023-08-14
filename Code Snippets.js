function findDifference(array1, array2) {
  // this compares two arrays and will find the difference between the two.
  var outputArr = [];
  array1.filter(function (element) {
    if (array2.indexOf(element) === -1) {
      outputArr.push(element);
    }
  });

  return outputArr;
}

function stringify(string) {
  //this function is for quickly converting JSON to a string.
  return gs.info(JSON.stringify(string));
}

function queryStringBuilder(fieldNameString, operatorString, dataArray, separatorString) {
  /* Query string function is used to build a large query string from an array of values. 
  queryStringBuilder('role','=',userRoles,'^ORrole=');*/


  var queryString = fieldNameString + operatorString + dataArray.join(separatorString);
  return queryString;
}
