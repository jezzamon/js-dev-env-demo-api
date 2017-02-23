'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _questions = require('./routes/questions.js');

var _questions2 = _interopRequireDefault(_questions);

var _bears = require('./routes/bears.js');

var _bears2 = _interopRequireDefault(_bears);

var _standup = require('./routes/standup.js');

var _standup2 = _interopRequireDefault(_standup);

var _questions_mongoose = require('./routes/questions_mongoose.js');

var _questions_mongoose2 = _interopRequireDefault(_questions_mongoose);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// https://murmuring-garden-99473.herokuapp.com/
var app = (0, _express2.default)();
// import famtree from './routes/famtree.js';


app.use((0, _cors2.default)());
//SET UP YOUR API TO BE USED BY ANY BROWSER (just for reference, cors package is handling this)
// app.use(function(req,res,next){
//    res.header("Access-Control-Allow-Origin","*"); //* allow requests from any domain
//    res.header("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept");
//    if(req.method === "OPTIONS") {
//        res.header("Access-Control-Allow-Methods", "PUT,POST,DELETE");
//         return res.status(200).json({});
//    }

//    next();
// });

// IF YOU'D LIKE TO SET UP A TEMPLATING ENGINE USING HTML (set up a views folder)
//SETUP PUBLIC FILES
// app.use(express.static(path.join(__dirname, 'public')));

// SETUP SWIG
// var swig = require('swig');
// app.engine('html', swig.renderFile);
// app.set('view engine', 'html');

// app.set('views', path.join(__dirname, 'views'));


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
// app.use("/famtree", famtree);
app.use("/standup", _standup2.default);
app.use("/questionsmdb", _questions_mongoose2.default);

// some test routes from route
app.get('/', function (request, response) {
    response.send('Hello World!');
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