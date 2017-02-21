import express from 'express';
const router = express.Router();
const mongoose = require('mongoose');
//use es6 native promise to avoid depreacted Mongoose.promises message from Mongoose
mongoose.Promise = global.Promise;
const Bear = require('../models/bear');
const Person = require('../models/familytree/individuals');
const User = require('../models/familytree/users');


const onError = (err) =>
console.log(err);

// GET /famtree/user
router.route('/user')
  .get((req,res) => {
    User.find()
      .then( (data) => {
        res.json({
          message: "Welcome to user routes",
          data: data
        });
      })
      .catch(onError);
  })
  .post( (req,res)=> {
    // POST /famtree/user
    let user = new User;
    user.username = req.body.username;
    user.email_address = req.body.email_address;
    user.password = req.body.password;

    user.save()
      .then( data => {
        res.json({
          message: 'User created',
          data: data
        });
      })
      .catch(onError);
  });

router.route('/')
  // GET /famtree/
  .get((req, res) => {
    Person.find()
      .then((data) => {
        res.json({
          message: "Welcome to family tree route",
          data: data
        });
      })
      .catch(onError);

  })
  // POST /famtree/
  .post((req, res) => {

    let person = new Person();
    person.name.first = req.body.firstName;
    person.name.last = req.body.lastName;
    person.events.birth.date = req.body.birth;

    person.save()
      .then((data) => {
        res.json({
          message: 'Person created',
          data: data
        });
      })
      .catch(onError);
  });
//
export default router;


/*
(err) => {
            res.json({"err": err});
        }
        */
