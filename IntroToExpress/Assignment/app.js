var express = require("express");

var app = express();

app.get("/", function (req, res) {
    res.send("Hi welcome to my ass.!");
});

app.get("/speak/:animal", function (req, res) {
    var an = req.params.animal;
    if(an === "pig") {
        res.send("Oink");
    }
    else if (an === "cow") {
        res.send("Mooo");
    }
    else if (an === "dog") {
        res.send("Woof woof");
    }
});

app.get("/repeat/:word/:number", function(req, res) {
    var str = "", wd = req.params.word, no = req.params.number;
    for (var i = 0; i < no/1; i++) {
        str += wd + " ";
    }
    res.send(str);
});

app.get("*", function(req, res) {
   res.send("Page not found loser"); 
});

app.listen(process.env.PORT, process.env.IP, function () {
   console.log("Server started"); 
});