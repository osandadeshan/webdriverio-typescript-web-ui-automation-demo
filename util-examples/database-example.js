import { execute } from "node-any-jdbc";
import { mysql } from "./db";
import assert from "assert";

var sql = 'SELECT * FROM emp_info where emp_name = "Osanda"';
execute(mysql, sql, function (results) {
  console.log(results);
  //then do what ever validation you to do withe results here
});
