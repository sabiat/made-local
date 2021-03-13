const db = require("./db");
const dbHelpers = require("./helpers/dbHelpers")(db);

var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
const shopsRouter = require("./routes/shops");
const categoriesRouter = require("./routes/categories");

var app = express();

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
