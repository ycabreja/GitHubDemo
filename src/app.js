//import libraries
var path = require("path");
var express = require("express");
var compression = require("compression");
var connectMongo = require("connect-mongo");
var mongoose = require("mongoose");
var favicon = require("serve-favicon");
var bodyParser = require("body-parser");

//bluebird promise instead of the normal mongo
mongoose.Promise = require("bluebird");

//connect to database
var dbURL = process.env.DB_URI || "mongodb://localhost/pocketaces";

var db = mongoose.connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true }, function(err) {
    if(err) {
        console.log("Could not connect to database");
        throw err;
    }
});

//pull in our routes
var router = require("./router.js");
var socketRouter = require("./socket-routes");

//make the server
var server;
var port = process.env.PORT || process.env.NODE_PORT || 5000;

var app = express();
app.use("/assets", express.static(path.resolve(__dirname+"/../client/")));
app.use(compression());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(favicon(__dirname + "/../client/img/favicon.png"));
app.disable('x-powered-by');

router(app);

//listen
server = app.listen(port, function(err) {
    if (err) {
      throw err;
    }
    console.log("Listening on port " + port);
});

//socketio
var io = require("socket.io")(server);
socketRouter.socketRouter(io);
