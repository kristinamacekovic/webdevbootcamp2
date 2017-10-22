var express = require("express");
var app = express();
// host the "public" folder publicly
app.use(express.static("public"));
// recognize the files in the views folder without the .ejs extension:
app.set("view engine", "ejs");
// you can now write love, home, posts without .ejs!

app.get("/", function (req, res) {
    res.render("home.ejs");
});

app.get("/fellinlovewith/:sth", function (req, res) {
    var thing = req.params.sth;
    res.render("love.ejs", {something:thing});
});

app.get("/posts", function (req, res) {
    var posts = [
            {title: "HEy", author:"KAyla"},
            {title: "OMG", author:"johnnie"},
            {title: "jesus", author: "morena"}
        ];
    res.render("posts.ejs", {posts: posts});
});

app.listen(process.env.PORT, process.env.IP, function (req, res) {
    console.log("Server started");
});