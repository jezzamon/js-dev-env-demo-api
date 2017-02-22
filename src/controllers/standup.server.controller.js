let Standup = require('../models/standup.server.model.js');

exports.list = (req,res) => {
  var query = Standup.find();

  query.sort({createdOn: 'desc'}) //sort by date descending
    .limit(12) //limit by 12
    .exec( (err,results) => {
      // console.log(results);
      if (err) {
        res.json({message: 'error!', error: err});
      } else {
      res.json({title: 'sorted list', notes: results});
      }
  });
};

exports.filterByMember = function(req, res) {
    var query = Standup.find(); //first find all notes
    var filter = req.body.memberName; //grab the memberName from request body

    query.sort({ createdOn: 'desc' }); //sort by date descending

    if (filter.length > 0) //check if a name was passed in req.body
    {
        query.where({ memberName: filter}); //filter by the member name passing in the filter that was from front end
    }

    query.exec(function(err, results) {
        // console.log(results);
        res.json({ title: 'Standup - List', notes: results });
    });
};

exports.create = (req,res) => {
  var entry = new Standup({
    memberName: req.body.memberName,
    project: req.body.project,
    workYesterday: req.body.workYesterday,
    workToday: req.body.workToday,
    impediment: req.body.impediment
  });
  entry.save( (err,data) => {
    if (err) {
      let errMsg = `Sorry, the was an error saving the meeting note. ${err}`;
      res.json({ title: 'Standup - New Note (error)', message: errMsg});
    } else {
      // console.log('Stand-up meeting note saved');
      // Redirect to home page
      res.json({message: 'saved!', data: data});
    }
  });

};

exports.getNote = (req,res) => {
  res.json({ title: 'Standup - new note'});
};
