
var express = require('express');
var router = express.Router();

//GET /questions
    //return all the questions
router.get("/", function(req,res) {
    
    res.json({response: "You sent me a GET request"});
});

//POST /questions
    //route for creating questions
router.post("/", function(req,res) {
    res.json({
        response: "You sent me a POST request", 
        body: req.body
    });
});

//GET /questions/:qID
    //return specific question
router.get("/:qID", function(req,res) {
    res.json({
        response: "You sent me a GET request for specific id " + req.params.qID});
});

//POST /questions/:qID/answers
    //route for creating an answer
router.post("/:qID/answers", function(req,res) {
    res.json({
        response: "You sent me a POST request to /answers", 
        questionId: req.params.qID,
        body: req.body
    });
});

//PUT /questions/:qID/answers/:aID
    //edit a specific answer
router.put("/:qID/answers/:aID", function(req,res) {
    res.json({
        response: "You sent me a PUT request to /answers", 
        questionId: req.params.qID,
        answerId: req.params.aID,
        body: req.body
    });
});

//DELETE /questions/:qID/answers/:aID
    //delete a specific answer
router.delete("/:qID/answers/:aID", function(req,res) {
    res.json({
        response: "You sent me a DELETE request to /answers", 
        questionId: req.params.qID,
        answerId: req.params.aID
    });
});

//POST /questions/:qID/answers/:aID/vote-up
//POST /questions/:qID/answers/:aID/vote-down
    //vote on a specific a specific answer
router.post("/:qID/answers/:aID/vote-:dir", function(req,res,next){
    //regular expressions with caret and dollar sign to signify we want these exact values and nothing after
    if (req.params.dir.search(/^(up|down)$/) === -1 ) {
        var err = new Error("Not found");
        err.status = 404;
        next(err); //use next if handler doesnt send a response(ie. res.json) to client
    } else {
        next();
    }
    
    },function(req,res) {
    res.json({
        response: "You sent me a POST request to /vote-" + req.params.dir, 
        questionId: req.params.qID,
        answerId: req.params.aID,
        vote: req.params.dir
    });
});


module.exports = router;