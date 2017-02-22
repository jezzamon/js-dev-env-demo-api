var mongoose = require("mongoose");
var Schema = mongoose.Schema;

// Helper function
var sortAnswers = function (a,b) {
    // - negative a before b
    // 0 if no change
    // + positive b before a

    // a) If votes are equal, order them by date they were updated
    // b) Sinon Lets order them by vote, answers with most votes appear at top
    if (a.votes === b.votes) {
        return b.updatedAt - a.updatedAt; //order larger (ie later) dates first
    }

    //If A has more votes, number will be negative, and A will be placed before B
    //If B has more votes, number will be positive, and B will be placed before A
    return b.votes - a.votes; //larger number placed first
}
var AnswerSchema = new Schema({
    text: String,
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now},
    votes: {type: Number, default: 0}
});

/* Note: To save a child document in mongoose you have to save its Parent document*/
/*add extra functionality to update - to update with latest time, params being update subject and callback */
AnswerSchema.method("update",function(updates, callback) {
    //merge updates into the answer document
    Object.assign(this, updates, {updatedAt: new Date()} );
    //question is parent and answer is child
    this.parent().save(callback);
});

AnswerSchema.method("vote",function(vote, callback) {
    if (vote === "up") {
        this.votes += 1;
    } else {
        this.votes -= 1;
    }
    this.parent().save(callback);
});

var QuestionSchema = new Schema({
    text: String,
    createdAt: {type: Date, default: Date.now},
    answers: [AnswerSchema] //placing the AnswerSchema here
});

QuestionSchema.pre("save", function (next) { //mongoose will sort the answers data every time its saved
    this.answers.sort(sortAnswers); //add an extra sort functionality as it would only sort strings if left with native function
    next();
});

module.exports = mongoose.model("Question", QuestionSchema);
