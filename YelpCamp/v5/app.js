var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var seedDB = require("./seeds");
var Comment = require("./models/comment");

seedDB();
mongoose.connect(process.env.DATABASEURL);
//mongoose.connect("mongodb://localhost/yelp_camp_v3", {useMongoClient: true});
//mongoose.connect("mongodb://macekovick:eiv4xeeS@ds127375.mlab.com:27375/macekovickyelpcamp", {useMongoClient: true});

var Campground = require("./models/campground");
        
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static(__dirname + "/public"));

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
            res.render("campgrounds/campgrounds", {campgrounds: allCampgrounds});
        }
    });
});

app.get("/campgrounds/new", function(req, res) {
   res.render("campgrounds/new"); 
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
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground) {
        if(err) {
            console.log(err);
        } else {
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });
});

// ==============
// COMMENT ROUTES
// ==============

app.get("/campgrounds/:id/comments/new", function(req, res) {
    Campground.findById(req.params.id, function(err, campground) {
        if (err) {
            console.log(err);
        } else {
            res.render("comments/new", { campground: campground });
        }
    });
});

app.post("/campgrounds/:id/comments", function(req, res) {
    // lookup camp using ID
    Campground.findById(req.params.id, function(err, campground) {
       if(err) {
           console.log(err);
           res.redirect("/campgrounds");
       } else {
           // create comment
           Comment.create(req.body.comment, function(err, comment) {
               if(err) {
                   console.log(err);
               } else {
                   // associate with campground
                   campground.comments.push(comment);
                   campground.save();
                   res.redirect("/campgrounds/" + campground._id);
               }
           });
       }
    });
});

app.listen(process.env.PORT, process.env.IP, function () {
    console.log("The server has started.");
});