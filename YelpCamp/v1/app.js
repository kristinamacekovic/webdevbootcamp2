var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var campgrounds = [
            { name: "Salmon Creek1", image: "https://farm4.staticflickr.com/3872/14435096036_39db8f04bc.jpg" },
            { name: "Salmon Creek2", image: "https://farm2.staticflickr.com/1281/4684194306_18ebcdb01c.jpg" },
            { name: "Salmon Creek3", image: "https://farm3.staticflickr.com/2311/2123340163_af7cba3be7.jpg" },
            { name: "Salmon Creek3", image: "https://farm3.staticflickr.com/2311/2123340163_af7cba3be7.jpg" },
            { name: "Salmon Creek3", image: "https://farm3.staticflickr.com/2311/2123340163_af7cba3be7.jpg" },
            { name: "Salmon Creek3", image: "https://farm3.staticflickr.com/2311/2123340163_af7cba3be7.jpg" },
            { name: "Salmon Creek3", image: "https://farm3.staticflickr.com/2311/2123340163_af7cba3be7.jpg" },
            { name: "Salmon Creek3", image: "https://farm3.staticflickr.com/2311/2123340163_af7cba3be7.jpg" },
            { name: "Salmon Creek3", image: "https://farm3.staticflickr.com/2311/2123340163_af7cba3be7.jpg" },
            { name: "Salmon Creek3", image: "https://farm3.staticflickr.com/2311/2123340163_af7cba3be7.jpg" }
        ];
        
app.use(bodyParser.urlencoded({extended: true}));

app.set("view engine", "ejs");

app.get("/", function (req, res) {
    res.render("landing");
});

app.get("/campgrounds", function (req, res) {
    // page displays all the available campgrounds
    res.render("campgrounds", {campgrounds: campgrounds});
});

app.get("/campgrounds/new", function(req, res) {
   res.render("new"); 
});

app.post("/campgrounds", function(req, res) {
    var name = req.body.name;
    var image = req.body.image;
    var newCampGround = { name: name, image: image};
    campgrounds.push(newCampGround);
    // the default is to redirect to get route
    res.redirect("/campgrounds");
});

app.listen(process.env.PORT, process.env.IP, function () {
    console.log("The server has started.");
});