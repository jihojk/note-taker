var express = require("express");
var fs = require("fs");
var path = require("path");

// Setup
var app = express();
var PORT = process.env.PORT || 8080;

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static(__dirname + '/public'));

// routes
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);
app.listen(PORT, function () {
    console.log("App listenin on PORT: " + PORT)
});