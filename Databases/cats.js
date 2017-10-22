var mongoose = require("mongoose");
mongoose.Promise = global.Promise;
//connect to the server that we are running (with the ./mongod command)
// cat_app is the name of the db; if it doesn't exist, it is created
mongoose.connect("mongodb://localhost/cat_app", {useMongoClient: true});
// we define a pattern for all our future cats
var catSchema = new mongoose.Schema({
    name: String,
    age: Number,
    temperament: String
});
// we compile it to a model which adds all the methods to it and save it to a variable
// the thing in "" should be a singualr version of the thing we will be wrking with
var Cat = mongoose.model("Cat", catSchema);
// now we do everything with the Cat object

// make a new instance
// var george = new Cat({
//     name: "Milky",
//     age: 5,
//     temperament: "Good"
// });
// //add a new cat to the db
// george.save(function(err, cat) {
//     if(err) {
//         console.log("Error");
//     } else {
//         console.log("A cat was added to the database");
//     }
// });

// create is new and save all in one
// Cat.create({
//     name: "Purry",
//     age: 6,
//     temperament: "OK"
// }, function(err, cat) {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log("A cat was created");
//     }
// });

//retrieve all cats from the db and console.log each one
Cat.find({}, function(err, cats) {
    if (err) {
        console.log("ERRRRRROOOORRR");
        console.log(err);
    } else {
        console.log(cats);
    }
});