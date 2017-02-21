'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _questions = require('./routes/questions.js');

var _questions2 = _interopRequireDefault(_questions);

var _bears = require('./routes/bears.js');

var _bears2 = _interopRequireDefault(_bears);

var _famtree = require('./routes/famtree.js');

var _famtree2 = _interopRequireDefault(_famtree);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// https://murmuring-garden-99473.herokuapp.com/
var app = (0, _express2.default)();


app.use((0, _cors2.default)());

app.set('port', process.env.PORT || 3000);

// CONNECT TO MONGODB
require('./connection.js')();

//configure middleware to give us colorful status codes
app.use((0, _morgan2.default)("dev"));

//Parse JSON and form data in req.body
app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({ extended: true }));

// ** ROUTES *******************************************/
app.use("/questions", _questions2.default);
app.use("/bears", _bears2.default);
app.use("/famtree", _famtree2.default);

app.get('/', function (request, response) {
  response.send('Hello World!');
});

app.get('/users', function (req, res) {
  // Hard coding for simplicity. Pretend this hits a real database
  res.json([{ "id": 1, "firstName": "Jerry", "lastName": "Relunia", "email": "zz@gmail.com" }, { "id": 2, "firstName": "Berry", "lastName": "Relunia", "email": "zzz@yahoo.com" }, { "id": 3, "firstName": "Muff", "lastName": "Relunia", "email": "zzzz@hotmail.com" }]);
});

// catch 404 and forward to error handler (note: res.json exits the script, so it doesnt get this far)
app.use(function (req, res, next) {
  //use JS' native Error object
  var err = new Error("404 Not found");
  err.status = 404;
  next(err);
});

//custom error handler (like middleware but with err paramater)
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    error: { message: err.message }
  });
});

app.listen(app.get('port'), function () {
  console.log("Node app is running at localhost:" + app.get('port'));
});