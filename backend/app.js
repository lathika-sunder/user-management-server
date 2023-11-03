var mongoose = require('mongoose')
var express = require('express')
var cors = require("cors")
const apiRoutes = require('./src/router/routes');
const {run} = require("./src/db/connect");
run();

var app = express();

app.use(cors())

var bodyParser = require('body-parser');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const PORT = 3000;
app.use("/", apiRoutes);
app.listen(PORT, () => {
    console.log(`App Started at localhost:${PORT}`);
})

