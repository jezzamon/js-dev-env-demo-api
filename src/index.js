import express from 'express';
import cors from 'cors';
import path from 'path';


// https://murmuring-garden-99473.herokuapp.com/
const app = express();
import questions from './routes/questions.js';
import bears from './routes/bears.js';
import famtree from './routes/famtree.js';
import standup from './routes/standup.js';
import logger from 'morgan';
import bodyParser from 'body-parser';

app.use(cors());
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


app.set('port', (process.env.PORT || 3000));

// CONNECT TO MONGODB
require('./connection.js')();

//configure middleware to give us colorful status codes
app.use(logger("dev"));

//Parse JSON and form data in req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))


// ** ROUTES *******************************************/
app.use("/questions",questions);
app.use("/bears", bears);
app.use("/famtree", famtree);
app.use("/standup", standup);

// some test routes from route
app.get('/', function(request, response) {
  response.send('Hello World!')
});

// catch 404 and forward to error handler (note: res.json exits the script, so it doesnt get this far)
app.use(function(req,res, next) {
    //use JS' native Error object
    var err = new Error("404 Not found");
    err.status = 404;
    next(err);
});

//custom error handler (like middleware but with err paramater)
app.use(function(err,req,res,next) {
    res.status(err.status || 500);
    res.json({
        error: {message: err.message}
    });
});

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'));
});
