var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/yelp_camp", {useMongoClient: true});

// schema setup
var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
});

var Campground = mongoose.model("Campground", campgroundSchema);

// Campground.create({ 
//     name: "Camping Straško – feel the nature!", 
//     image: "http://www.camping.hr/thumbnail.aspx?Image=/cmsmedia/novosti/21836/strasko-naslovna.jpg&width=529&height=344&crop=true&save=1&quality=60",
//     description: "Located only 2km from the center of Novalja, on the island of Pag , the 4-star campsite Straško lies right next to the sea in a beautiful bay and it expands on 57 acres, under the shade of Dalmatian oak forest."
// }, function (err, campground) {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log(campground);
//     }
// });
        
app.use(bodyParser.urlencoded({extended: true}));

app.set("view engine", "ejs");

app.get("/", function (req, res) {
    res.render("landing");
});

app.get("/campgrounds", function (req, res) {
    // page displays all the available campgrounds
    Campground.find({}, function(err, allCampgrounds) {
        if(err) {
            console.log(err);
        } else {
            res.render("campgrounds", {campgrounds: allCampgrounds});
        }
    });
});

app.get("/campgrounds/new", function(req, res) {
   res.render("new"); 
});

app.post("/campgrounds", function(req, res) {
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.desc;
    var newCampGround = { name: name, image: image, description: desc};
    Campground.create(newCampGround, function(err, newlyCreated) {
        if (err) {
            console.log(err);
        } else {
            res.redirect("/campgrounds");        
        }
    });
    // the default is to redirect to get route
});

app.get("/campgrounds/:id", function (req, res) {
    Campground.findById(req.params.id, function(err, foundCampground) {
        if(err) {
            console.log(err);
        } else {
            res.render("show", {campground: foundCampground});
        }
    });
});

app.listen(process.env.PORT, process.env.IP, function () {
    console.log("The server has started.");
});