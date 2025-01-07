require("dotenv").config();
const express = require("express");
const mysqlPool = require("./db");
const app = express();

const PORT = process.env.PORT || 8080;
app.use(express.json());




app.listen(PORT);
