const mysql = require("mysql2");

const mysqlPool = mysql
  .createPool({
    host: process.env.LOCALHOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE_NAME,
  })
  .promise();


module.exports = mysqlPool

