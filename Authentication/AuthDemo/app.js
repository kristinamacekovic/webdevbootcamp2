var express               = require("express"),
    mongoose              = require("mongoose"),
    passport              = require("passport"),
    bodyParser            = require("body-parser"),
    localStrategy         = require("passport-local"),
    passportLocalMongoose = require("passport-local-mongoose"),
    User                  = require("./models/user");
    
// connect to the db
mongoose.connect("mongodb://localhost/auth_demo_app");

var app = express();

app.set("view engine", "ejs");

app.use(require("express-session")({
    secret: "Secret sentence",
    resave: false,
    saveUninitialized: false
}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
// ROUTES BEGIN
app.get("/", function(req, res) {
    res.render("home");
});

app.get("/secret", isLoggedIn, function(req, res) {
    res.render("secret");
});

//AUTH ROUTES BEGIN

// show signup form
app.get("/register", function(req, res) {
    res.render("register");
});
// handle signup
app.post("/register", function(req, res) {
    User.register(new User({username:req.body.username}), req.body.password, function(err, user){
        if(err) {
            console.log(err);
            return res.render("register");
        } 
        passport.authenticate("local")(req, res, function(){
            res.redirect("/secret");
        });
    });
});

//====LOGIN ROUTES ===>
// render login page

app.get("/login", function(req, res) {
    res.render("login");
});
// login logic
app.post("/login", passport.authenticate("local", {
    successRedirect: "/secret",
    failureRedirect: "/login"
}), function(req, res) {
});
//logout
app.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/");
});
// middleware
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
}


app.listen(process.env.PORT, process.env.IP, function() {
    console.log("Server has been started!");
});