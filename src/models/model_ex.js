var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var includedMiddleName = true;

var exampleSchema = new Schema;

if (includedMiddleName) {
  exampleSchema.add({
    memberName: {
      first: String,
      middle: String,
      last: String
    }
  });
} else {
  exampleSchema.add({
    memberName: {
      first: String,
      last: String
    }
  });
}

exampleSchema.add({
  project: String,
  workYesterday: String,
  workToday: String,
  impediment: String,
  createdOn: {type: Date,default: Date.now}
})

let customerSchema = new Schema({
  name: { type: String, required: true},
  address: String,
  city: String,
  state: String,
  createdOn: { type: String, default: date.now}
});

//After schea is defined - via the path API
customerSchema.path('city').required(true, 'Oops! Supply a city!');

// /********** Strings- Match and Enum **************/

// String - match validator example
let reMatch = /a-zA-Z/; //only alpha letters
customerSchema = new Schema({
  name: {type: String,
        required: true,
        match: reMatch},

})


// String - Enum validator
let impediments = ['none', 'minor', 'blocking', 'severe'];

let standupSchema = new Schema({
  //abbreviated...
  impediment: {
    type: String,
    required: true,
    enum: impediments
  }
});

//***********  Min and max validator *****************/
// Customer must receive a min %5 discount
customerSchema = new Schema({
  name: String,
  //...
  discount: {type: Number, min: 5}
});

//Customers not allowed more than 60%
customerSchema = new Schema({
  name: String,
  //...
  discount: { type: Number, max: 60}
})

// *************  CUSTOM VALIDATION *********************/
// Customr validation - method signature = validate(obj, [error Message])

// custom validator is an array with two indexes, function and error string
let sizeValidator = [
  (val) => {
    return (val.length > 0 && val.length <= 50); //return a boolean
  },
  // Custom error text
  'String must be between 1 and 50 characters long'
];

let personSchema = new Schema({
  firstName: {type : String, required: true, validate: sizeValidator},
  lastName: {type : String, required: true, validate: sizeValidator},
  status: {type : String, required: true, default: 'Alive'},
})



module.exports = mongoose.model('Example', exampleSchema);
