let Standup = require('../models/standup.server.model');

// Model.update(conditions, update, [options], [callback])
//setup conditions
let condition = { memberName: 'Mary'};
let update = { impediment: 'None - Mary no longer works here!'};

Standup.update(condition, update, (err, numberAffected, rawResponse) => {
  // Handle error or raw results here...
});

// finding a document then updating it (note: Multiple trips to db)

Standup.findOne({memberName: 'Mary '}, (err, doc) => {
  //Handle errors..valdiate document results etc...
  doc.impediment = 'None - Mary no longer works here! She won the lotto';
  doc.save( err => {
    //handle errors
  });
});

// options argument in Model.update plus their default value
// safe   [True]
// upsert - [False] - create document if doesnt match
// multi - [False] -detemine if multiple docs should be updated or not
// strict - override the strict option
// overwrite [false] - disable the update-only mode to allow for overwrite document

// eg Update multiple documents that match condition

condition = { firstName: 'Jerry'};
update = { firstName: 'Jezza'};

Customer.update(
  condition,
  update,
  { multi: true},
  (err, numberAffected, raw) => {
    //handle error, returned # affected, and raw response from mongodb
  });


// Model.remove(conditions, [callback])
condition = { memberName: 'Mary'};

Standup.remove(condition, (err) => {
  // handle error here...
});

// Remove any document created on or after Halloween
let gteDate = new Date(2017, 10, 31);
Standup.remove({ createdOn: { $gte: gteDate}}, (err) => {
  // handle error here...
});

// Execute a query w/o a callback function - does not wait on response
let query = Standup.remove({ createdOn: { $gte: gteDate}});
query.exec();

//******** FIND BY ID AND UPDATE  **************** */
// Model.findByIdAndUpdate(id, update, [options], [callback]);

// options and default value
// new [true] - Set true to return the modified document rather than original
// upsert [false] - Create the document if it doesnt match
// select - Specify the document fields to return

//******* FIND BY ID AND REMOVE ******************* */
// Model.findByIdAndRemove(id, [options], [callback])

// options and default value
// select - Specify the document fields to return
