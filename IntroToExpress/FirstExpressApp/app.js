var express = require("express");
var app = express();

app.get("/", function (req, res) {
   res.send("Hi there"); 
});

app.get("/bye", function (req, res) {
   res.send("bye"); 
});

app.get("/dogs", function (req, res) {
   res.send("Meow"); 
});

app.get("/r/:subbredditName", function (req, res) {
    var sub = req.params.subbredditName;
   res.send("Welcome to the " + sub.toUpperCase() + " subreddit!!!"); 
});
// : for anything we want to be a variable
app.get("/r/:subbredditName/comments/:id/:title", function (req, res) {
   res.send("See the comments!"); 
});
// has to be in the end because it searches for the first occurance; * is for everything else not specified
app.get("*", function (req, res) {
   res.send("Not Found"); 
});


app.listen(process.env.PORT, process.env.IP, function () {
    console.log("Server has started");
});