'use strict';

var mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/sandbox");

var db = mongoose.connection;

db.on("error", function (err) {
    console.error("connection error:" + err);
});

db.once("open", function () {
    console.log("db connection succesful");
    //all database connection goes here

    var Schema = mongoose.Schema;
    var AnimalSchema = new Schema({
        type: { type: String, default: "goldfish" },
        size: String,
        color: { type: String, default: "gold" },
        mass: { type: Number, default: 0.3 },
        name: { type: String, default: "Derek" }
    });

    //pre save hook
    AnimalSchema.pre("save", function (next) {
        if (this.mass >= 100) {
            this.size = "big";
        } else if (this.mass >= 5 && this.mass < 100) {
            this.size = "medium";
        } else {
            this.size = "small";
        }
        next();
    });

    //custom built queries
    AnimalSchema.statics.findSmall = function (callback) {
        //this == Animal
        return this.find({ size: "small" }, callback);
    };

    AnimalSchema.statics.findSize = function (size, callback) {
        //this == Animal
        return this.find({ size: size }, callback);
    };

    //customr query of instances
    AnimalSchema.methods.findSameColor = function (callback) {
        //this == document
        return this.model("Animal").find({ color: this.color }, callback);
    };

    //create new collection in MONGODB (saves as "animals")
    var Animal = mongoose.model("Animal", AnimalSchema);

    var elephant = new Animal({
        type: "Elephant",
        color: "grey",
        mass: 6000,
        name: "Jody"
    });

    var animal = new Animal({}); //will pass default goldfish

    var whale = new Animal({
        type: "Whale",
        mass: 12000,
        name: "Big blue"
    });

    var animalData = [{
        type: "mouse",
        color: "grey",
        mass: 0.035,
        name: "Marvin"
    }, {
        type: "nutria",
        color: "brown",
        mass: 6.35,
        name: "Gretchen"
    }, {
        type: "mouse",
        color: "grey",
        mass: 0.035,
        name: "Tabatha"
    }, elephant, animal, whale];
    Animal.remove({}, function (err) {
        //this will remove all from schema before adding new to avoid duplicates in testing
        if (err) console.error(err);
        Animal.create(animalData, function (err, animals) {
            if (err) console.error("save failed" + err);

            //            Animal.find({}, function(err, animals) {
            //            Animal.findSmall(function(err, animals) {
            //            Animal.findSize("medium",function(err, animals) {
            Animal.findOne({ type: "Elephant" }, function (err, elephant) {
                elephant.findSameColor(function (err, animals) {
                    if (err) console.error(err);
                    animals.forEach(function (animal) {
                        console.log(animal.name + " the " + animal.color + " " + animal.type + " is a " + animal.size + "-sized animal");
                    });
                    db.close(function () {
                        console.log("db connection closed");
                    });
                });
                /*animals.forEach(function(animal){
                    console.log(animal.name + " the " + animal.color + " " + 
                                animal.type + " is a " + animal.size + "-sized animal");
                });
                db.close(function() {
                    console.log("db connection closed");
                });*/
            });
        });
    });

    //    db.close();
});