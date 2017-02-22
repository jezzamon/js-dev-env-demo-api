var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var memberNameValidator = [
  (val) => val.length > 0 && val.toLocaleLowerCase() != 'none',
  'Select a valid member name'
];


var requiredStringValidator = [
  (val) => {
    let testVal = val.trim();
    return (testVal.length >0);
  },
  '{PATH} cannot be empty'
];

var standupSchema = new Schema({
  memberName: { type: String, required: true, validate: memberNameValidator},
  project: { type: String, required: true, validate: requiredStringValidator},
  workYesterday: { type: String, required: true, validate: requiredStringValidator},
  workToday: { type: String, required: true, validate: requiredStringValidator},
  impediment: { type: String, required: true, default: 'none', validate: requiredStringValidator},
  createdOn: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Standup', standupSchema);
