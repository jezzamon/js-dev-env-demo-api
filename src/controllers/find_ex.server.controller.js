let Standup = require('../models/standup.server.model');

// No callback ... deferred execution
// Set up query object to use later
let query = Standup.find();


//********* FIND METHOD ***************** */


// With callback... executes query immediately
Standup.find( (err, results) => {
  //handle error ..Or results
});

//With callback and query conditions
Standup.find({ memberName: 'Jerry'}, (err, results) => {
  //handle callback
});

// Limit the returned field
Standup.find({ memberName: 'Joseph'}, 'memberName impediment',
  (err,results) => {
    //callback
});

//***************** findOne METHOD ********** */
//No callback ... no conditions
query=  Standup.findOne();
//execute the findOne
query.exec( (err, results) => {
  // handle error or results
});

// with conditions...
query = Standup.findOne ({ memberName: 'Mark'});

//***************** findById METHOD *********** */
let id = "58acb3252fc48644f45938a2";

//by Id... No conditions
query = Standup.findById(id);
query.exec( (err,doc) => {
  //handle error or results...
});

// Same as above... Chaned method calls
Standup.findById(id).exec((err,results) => {
  //handle error or results...
});

// By Id... Return every field BUT impediment
query = Standup.findById(id, '-impediment');

// ************** COMPARISON QUERY OPERATORS ****************/
// ************** where clause ******************************/
Customer.find({discount: {$gte: 10, $lt: 20}}, (err,results) => {
  if (err) throw err;
  console.log(results);
});

Customer.where('discount').gte(10).lt(20).exec( (err, results) => {
  if (err) throw err;
  console.log(results);
});

//Chain methods together
Customer.where('discount').gte(10).lt(20)
  .where('zipcode', '12345')
  .exec( (err, results) => {
  if (err) throw err;
  console.log(results);
});











