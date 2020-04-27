const express = require("express");
const bodyParser = require("body-parser");
const multer = require("multer");
const ejs = require("ejs");
const app = express();

app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
    extended: true
}));


const routes = require('./routes/routes.js')(app);

app.listen(3000, function () {
    console.log("Server is running on port 3000.");
});