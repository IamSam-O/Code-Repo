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

function queryStringBuilder(fieldNameString, operatorString, dataArray, separatorString) {
  /* Query string function is used to build a large query string from an array of values. 
  queryStringBuilder('role','=',userRoles,'^ORrole=');*/

  var queryString =
    fieldNameString + operatorString + dataArray.join(separatorString);
  return queryString;
}


function findUniqueValues(arrayToFilter) {
//when calling the function pass in the name of the array to filter 
  return arrayToFilter.filter(function (element, index, array) {
      return array.indexOf(element) === index;
  });
};
