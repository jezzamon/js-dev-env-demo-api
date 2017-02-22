var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var BearSchema   = new Schema({

  name: String,
	color: String,

});

//no id
//  { _id: false}

module.exports = mongoose.model('Bear', BearSchema);
