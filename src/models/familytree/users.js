var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var UsersSchema = new Schema({
  username: String,
  email_address: String,
  password: String,
  individual_id: { type: Schema.Types.ObjectId , ref: 'Individual'}
  });



module.exports = mongoose.model('User', UsersSchema);
