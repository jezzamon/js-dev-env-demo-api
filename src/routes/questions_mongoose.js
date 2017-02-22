import express from 'express';
let router = express.Router();

//include our models
var Question = require("../models/question");

/*Express allows us to trigger a handler whenever a URL paramater is present
/* allowing us to preload the document */

//Preload one document by qID
router.param("qID", function(req, res, next, id) {
    //run mongoose method findbyID if qID parameter is present
    Question.findById(id, function(err, doc){
        if(err) return next(err);

        //if doc cannot be found return custom error object
        if (!doc) {
            err = new Error ("Not found");
            err.status = 404; //remember to set the error status on Error object
            return next(err);
        }
        //if doc exsists, lets set it on the request object so it can be used in other middleware and route handlers that receive this request
        req.question = doc;
        return next(); //trigger next middleware
    });
})

//Preload one document by aID
    //Mongoose has a special method on sub documents array called ID
    // the id method takes an id of a subdocument and returns the subdocument with that matching ID
router.param("aID", function(req, res, next, id) {
    req.answer = req.question.answers.id(id); //passing the ID to search subdocument (answers doc is child of question)

    //if answer cannot be found return custom error object
        if (!req.answer) {
            let err = new Error ("Not found");
            err.status = 404; //remember to set the error status on Error object
            return next(err);
        }
    //otherwise pass next to give control back to router
    next();
})

//GET /questionsmdb
    //return all the questions
router.get("/", function(req,res, next) {
    //using mongoose find() method
    //need to add additional params to find before callback a) Null to return complete document, not partials, sort to sort by date negative -1 means descending order
    //if error send error handler (next(err))

    /*Question.find({}, null, {sort: {createdAt: -1}} function (err, questions) {
        if (err) return next(err);
        res.json(questions);
    })*/

    //Alternative method - query builder
    Question.find({})
            .sort({createdAt: -1})
            .exec(function (err, questions) {
                if (err) return next(err);
                res.json(questions);
            });
});

//POST /questionsmdb
    //route for creating questions
router.post("/", function(req,res, next) {
    var question = new Question(req.body); //save req.body
    question.save(function(err,question){
        if(err) {
            return next(err);
        }

        res.status(201); //doc succesfully saved
        res.json(question); //return to client as JSON
    });
});

//GET /questionsmdb/:qID
    //return specific question
router.get("/:qID", function(req,res) {
    res.json(req.question); //req.question preloaded above (router.param("qID...))
});


//POST /questionsmdb/:qID/answers
    //route for creating an answer
router.post("/:qID/answers", function(req,res, next) {
    req.question.answers.push(req.body);  //push body to preloaded questions object
    //call mongoose save method on req.question object
    req.question.save(function(err,question){
        if(err) return next(err);


        res.status(201); //doc succesfully saved
        res.json(question); //return to client as JSON
    });

});

//PUT /questionsmdb/:qID/answers/:aID
    //edit a specific answer
router.put("/:qID/answers/:aID", function(req,res) {
    //use mongoose's update method
    req.answer.update(req.body, function(err, result) {
        if(err) return next(err);

        res.json(result); //sent result back to client
    });

});

//DELETE /questionsmdb/:qID/answers/:aID
    //delete a specific answer
router.delete("/:qID/answers/:aID", function(req,res) {
    //use mongoose's remove method
    req.answer.remove(function(err) {
        //in callback, save the parent question to update
        req.question.save(function(err, question){
            if(err) return next(err);
            res.json(question);
        })
    });
});

//POST /questions/:qID/answers/:aID/vote-up
//POST /questions/:qID/answers/:aID/vote-down
    //vote on a specific a specific answer
    //two handlers here in form of function() (one for validation of "up" and "down") next for adding votes
router.post("/:qID/answers/:aID/vote-:dir", function(req,res,next){
    //regular expressions with caret and dollar sign to signify we want these exact values and nothing after
    if (req.params.dir.search(/^(up|down)$/) === -1 ) {
        var err = new Error("Not found");
        err.status = 404;
        next(err); //use next if handler doesnt send a response(ie. res.json) to client
    } else {
        req.vote = req.params.dir;
        next();
    }

    },
    function(req,res, next) {
        req.answer.vote(req.vote, function(err, question){
            if(err) return next(err);
            res.json(question);
        });
});


export default router;
