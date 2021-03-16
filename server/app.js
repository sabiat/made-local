const {normalizePort, onError, onListening} = require('./bin/helpers');
const db = require("./db");
const dbHelpers = require("./helpers/dbHelpers")(db);
var debug = require('debug')('server:server');
var http = require('http');
var express = require("express");
var app = express();

var port = normalizePort(process.env.PORT || '3000');
app.set('port', port);
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
const shopsRouter = require("./routes/shops");
const categoriesRouter = require("./routes/categories");


var server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', onError);
server.on('listening', () => onListening(server, debug, port));

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/api/users", usersRouter(dbHelpers));
app.use("/api/shops", shopsRouter(dbHelpers));
app.use("/api/categories", categoriesRouter(dbHelpers));

module.exports = app;
