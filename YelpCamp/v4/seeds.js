var mongoose = require("mongoose");

var Campground = require("./models/campground");

var Comment = require("./models/comment");

var data = [
        {
            name: "BLA 1",
            image: "https://cdn.pixabay.com/photo/2014/11/27/18/36/tent-548022__340.jpg",
            description: "Some tent in the night"
        },
        {
            name: "BLA 2",
            image: "https://cdn.pixabay.com/photo/2015/07/10/17/24/night-839807__340.jpg",
            description: "Other tent"
        },
        {
            name: "BLA 3",
            image: "https://cdn.pixabay.com/photo/2017/08/29/04/16/site-2692058__340.jpg",
            description: "Another tent different than before!"
        }
    ];
    
function seedDB() {
    // remove all campgrounds
    Campground.remove({}, function(err) {
        if (err) {
            console.log(err);
        }
        console.log("You removed a campground!");
        // add campgrounds
        data.forEach(function(seed){
            Campground.create(seed, function(err, campground) {
            if(err) {
               console.log(err);
            } else {
               console.log("You added a new Campground!");
                // add comments
                Comment.create({
                   text: "A great camp wooohooo",
                   author: "Homie"
               }, function(err, comment) {
                   if (err) {
                       console.log(err);
                   } else {
                       campground.comments.push(comment);
                       campground.save();
                       console.log("Created new comment ");
                   }
               });
            }
        }); 
    });
});    
}

module.exports = seedDB;