/***************************************************************************************/
/**
					place holder for framework reusable library
 **/
/****************************************************************************************/

import xls_json from "../node_modules/node-excel-to-json";

export function isEquals(x, y) {
  // If both x and y are null or undefined and exactly the same
  if (x === y) {
    return true;
  }

  // If they are not strictly equal, they both need to be Objects
  if (!(x instanceof Object) || !(y instanceof Object)) {
    return false;
  }

  // They must have the exact same prototype chain, the closest we can do is
  // test the constructor.
  if (x.constructor !== y.constructor) {
    return false;
  }

  for (var p in x) {
    // Inherited properties were tested using x.constructor === y.constructor
    if (x.hasOwnProperty(p)) {
      // Allows comparing x[ p ] and y[ p ] when set to undefined
      if (!y.hasOwnProperty(p)) {
        return false;
      }

      // If they have the same strict value or identity then they are equal
      if (x[p] === y[p]) {
        continue;
      }

      // Numbers, Strings, methods, Booleans must be strictly equal
      if (typeof x[p] !== "object") {
        return false;
      }

      // Objects and Arrays must be tested recursively
      if (!equals(x[p], y[p])) {
        return false;
      }
    }
  }

  for (p in y) {
    // allows x[ p ] to be set to undefined
    if (y.hasOwnProperty(p) && !x.hasOwnProperty(p)) {
      return false;
    }
  }

  return true;
}

export function isArray(myArray) {
  return myArray.constructor.toString().indexOf("Array") > -1;
}

export function getObjValues(myjson) {
  var outValuesInArray = [];

  if (this.isArray(myjson)) {
    json = myjson[0];
  } else {
    json = myjson;
  }
  for (var x in json) {
    outValuesInArray.push(json[x]);
  }
  //console.log(outValuesInArray);
  return outValuesInArray;
}

export function getValueByKey(jsonObj, jsonKey) {
  //this.jsonKey = jsonKey;
  var keyValue = "";

  if (this.isArray(jsonObj)) {
    var json = jsonObj[0];
  } else {
    json = jsonObj;
  }
  //console.log(json);
  if (json.hasOwnProperty(jsonKey.toUpperCase())) {
    return (keyValue = json[jsonKey.toUpperCase()]);
  } else if (json.hasOwnProperty(jsonKey.toLowerCase())) {
    return (keyValue = json[jsonKey.toLowerCase()]);
  } else if (json.hasOwnProperty(jsonKey)) {
    return (keyValue = json[jsonKey]);
  } else {
    return undefined;
  }
}

export function isContains(json, value) {
  let contains = false;
  Object.keys(json).some((key) => {
    contains =
      typeof json[key] === "object"
        ? isContains(json[key], value)
        : json[key] === value;
    return contains;
  });
  return contains;
}

export function getObjFromList(jsonArray, KeyName, valueToSearch) {
  for (var i = 0; i < jsonArray.length; ++i) {
    if (
      jsonArray[i].hasOwnProperty(KeyName) &&
      jsonArray[i][KeyName] == valueToSearch
    ) {
      //console.log(jsonArray[i]);
      return jsonArray[i];
    } else {
      continue;
    }
  }
}

export function findObjects(obj, targetProp, targetValue, finalResults) {
  function getObject(theObject) {
    let result = null;
    if (theObject instanceof Array) {
      for (let i = 0; i < theObject.length; i++) {
        getObject(theObject[i]);
      }
    } else {
      for (let prop in theObject) {
        if (theObject.hasOwnProperty(prop)) {
          //console.log(prop + ': ' + theObject[prop]);
          if (prop === targetProp) {
            //console.log('--found id');
            if (theObject[prop] === targetValue) {
              //console.log('----found porop', prop, ', ', theObject[prop]);
              finalResults.push(theObject);
            }
          }
          if (
            theObject[prop] instanceof Object ||
            theObject[prop] instanceof Array
          ) {
            getObject(theObject[prop]);
          }
        }
      }
    }
  }
  getObject(obj);
}

export function excel_getTableRow(
  fileName,
  sheetName,
  columnName,
  where,
  callback
) {
  xls_json(
    fileName,
    {
      convert_all_sheet: false,
      return_type: "Object",
      sheetName: sheetName,
    },
    function (err, result) {
      if (err) {
        console.error(err);
      } else if (result) {
        for (var row = 0; row < result.length; ++row) {
          if (
            result[row].hasOwnProperty(columnName) &&
            result[row][columnName] == where
          ) {
            //console.log(result[row]);
            callback(result[row]);
          }
        }
      }
    }
  );
}

export function excel_getTableRows(fileName, sheetName, callback) {
  xls_json(
    fileName,
    {
      convert_all_sheet: false,
      return_type: "Object",
      sheetName: sheetName,
    },
    function (err, result) {
      if (err) {
        console.error(err);
      } else if (result) {
        //console.log(result);
        return callback(result);
      }
    }
  );
}

export function excel_getAllSheetData(fileName, callback) {
  xls_json(
    fileName,
    {
      convert_all_sheet: true,
      return_type: "Object",
    },
    function (err, result) {
      if (err) {
        console.error(err);
      } else if (result) {
        //console.log(result);
        return callback(result);
      }
    }
  );
}

export function getTimeStamp() {
  var now = new Date();
  return (
    now.getMonth() +
    1 +
    "/" +
    now.getDate() +
    "/" +
    now.getFullYear() +
    " " +
    now.getHours() +
    ":" +
    (now.getMinutes() < 10 ? "0" + now.getMinutes() : now.getMinutes()) +
    ":" +
    (now.getSeconds() < 10 ? "0" + now.getSeconds() : now.getSeconds())
  );
} // end of module
