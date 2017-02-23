'use strict';

var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

//comment out before deploying
process.env.NODE_ENV = 'development';

if (process.env.NODE_ENV === 'development') {
    var dotenv = require('dotenv');
    dotenv.load(); //using just for development - set through heroku config to work on heroku
}

var connection = function connection() {
    var mongodbUri = process.env.MONGO_USERNAME + ':' + process.env.MONGO_PASSWORD + '@ds051334.mongolab.com:51334/multivision';
    // var mongodbUri = 'mongodb://localhost/famtree';

    // CONFIGURE MONGOOSE CONNECTION
    var db = mongoose.connection;
    mongoose.connect(mongodbUri);

    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function callback() {
        //listen on open even once,
        console.log('hey hey, mongodb opened');
    });
};

module.exports = connection;