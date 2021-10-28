const express = require('express');
const app = express();

const cors = require('cors');
app.use(cors());

const bodyparser = require('body-parser');
const cookieParser = require('cookie-parser')


app.use(express.json());
app.use(bodyparser.urlencoded({ extended:true}));
app.use(cookieParser())

// API's
const auth = require("./routes/auth");
const admin = require("./routes/admin");
const employee = require("./routes/employee");


app.use("/api", auth);
app.use("/api", admin);
app.use("/api", employee);

module.exports = app;