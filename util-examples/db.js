export const oracle = {
  libpath: __dirname + "/drivers/oracle/ojdbc7.jar",
  drivername: "oracle.jdbc.driver.OracleDriver",
  url: "jdbc:oracle:thin:QA/password123@//abc-test.corp.int:1527/stage1S"
};

export const mysql = {
  libpath: __dirname + "/drivers/mysql/mysql-connector-java-5.0.8-bin.jar",
  drivername: "com.mysql.jdbc.Driver",
  uri: "jdbc:mysql://localhost/employee_database",
  user: "root",
  password: "root123",
};

// you can have other config as well
