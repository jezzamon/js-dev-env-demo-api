'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();
var mongoose = require('mongoose');
//use es6 native promise to avoid depreacted Mongoose.promises message from Mongoose
mongoose.Promise = global.Promise;
var Bear = require('../models/bear');
var Person = require('../models/familytree/individuals');
var User = require('../models/familytree/users');

var onError = function onError(err) {
  return console.log(err);
};

// GET /famtree/user
router.route('/user').get(function (req, res) {
  User.find().then(function (data) {
    res.json({
      message: "Welcome to user routes",
      data: data
    });
  }).catch(onError);
}).post(function (req, res) {
  // POST /famtree/user
  var user = new User();
  user.username = req.body.username;
  user.email_address = req.body.email_address;
  user.password = req.body.password;

  user.save().then(function (data) {
    res.json({
      message: 'User created',
      data: data
    });
  }).catch(onError);
});

router.route('/')
// GET /famtree/
.get(function (req, res) {
  Person.find().then(function (data) {
    res.json({
      message: "Welcome to family tree route",
      data: data
    });
  }).catch(onError);
})
// POST /famtree/
.post(function (req, res) {

  var person = new Person();
  person.name.first = req.body.firstName;
  person.name.last = req.body.lastName;
  person.events.birth.date = req.body.birth;

  person.save().then(function (data) {
    res.json({
      message: 'Person created',
      data: data
    });
  }).catch(onError);
});
//
exports.default = router;

/*
(err) => {
            res.json({"err": err});
        }
        */