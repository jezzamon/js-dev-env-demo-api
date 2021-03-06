import express from 'express';
const router = express.Router();
const mongoose = require('mongoose');
//use es6 native promise to avoid depreacted Mongoose.promises message from Mongoose
mongoose.Promise = global.Promise;
const Bear = require('../models/bear');


const onSave = (req, res, data) => {
  res.json({message: 'saved!', data: data});
}

const onError = (err) =>
console.log(err);


router.route('/')
  // GET /bears/
  .get((req, res) => {
    Bear.find()
      .then((data) => {
        res.json({
          message: "Welcome to bears route",
          data: data
        });
      })
      .catch(onError);

  })
  // POST /bears/
  .post((req, res) => {

    let bear = new Bear();
    bear.name = req.body.name;
    bear.color = req.body.color;

    bear.save()
      .then((data) => {
        onSave(req, res, data);
      })
      .catch(onError);
  });
//
export default router;

