require("dotenv").config();
const express = require("express");
const mysqlPool = require("./db");
const app = express();
const router = require('./routes')


const PORT = process.env.PORT || 8080;
app.use(express.json());
app.use('/api/v1', router)




app.listen(PORT);
