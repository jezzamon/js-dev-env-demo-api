import express from 'express';
import cors from 'cors';


// https://murmuring-garden-99473.herokuapp.com/
const app = express();
import questions from './routes/questions.js';
import bears from './routes/bears.js';
import famtree from './routes/famtree.js';
import logger from 'morgan';
import bodyParser from 'body-parser';

app.use(cors());

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

app.get('/', function(request, response) {
  response.send('Hello World!')
});

app.get('/users', function(req, res) {
  // Hard coding for simplicity. Pretend this hits a real database
  res.json([
    {"id": 1,"firstName":"Jerry","lastName":"Relunia","email":"zz@gmail.com"},
    {"id": 2,"firstName":"Berry","lastName":"Relunia","email":"zzz@yahoo.com"},
    {"id": 3,"firstName":"Muff","lastName":"Relunia","email":"zzzz@hotmail.com"}
  ]);
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
