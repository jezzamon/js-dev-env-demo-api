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

var onError = function onError(err) {
  return console.log(err);
};

router.route('/')
// GET /bears/
.get(function (req, res) {
  Bear.find().then(function (data) {
    res.json({
      message: "Welcome to bears route",
      data: data
    });
  }).catch(onError);
})
// POST /bears/
.post(function (req, res) {

  var bear = new Bear();
  bear.name = req.body.name;
  bear.color = req.body.color;

  bear.save().then(function (data) {
    res.json({
      message: 'Bear created',
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