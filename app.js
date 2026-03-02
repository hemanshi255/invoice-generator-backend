var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const cors = require("cors");

const mongoose = require("mongoose");
mongoose
  .connect(process.env.MONGO_URI || "mongodb://localhost:27017/Invoice")
  .then(() => {
    console.log("Connect Success");
  })
  .catch((error) => {
    console.log(error, "Connection Failed");
  });

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var customerRouter = require("./routes/customer");
var productRouter = require("./routes/product");
var inventoryRouter = require("./routes/inventory");
var invoiceRouter = require("./routes/invoice");
const companyRouter = require("./routes/company");
const authRouter = require("./routes/auth");
const balanceRouter = require("./routes/balance");

const { error } = require("console");

var app = express();
app.use(cors());

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/auth", authRouter);
app.use("/customer", customerRouter);
app.use("/product", productRouter);
app.use("/inventory", inventoryRouter);
app.use("/invoice", invoiceRouter);
app.use("/company", companyRouter);
app.use("/balance", balanceRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
