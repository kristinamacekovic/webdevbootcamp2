var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/blog_demo");

// POST has TITLE, CONTENT
var postSchema = new mongoose.Schema({
    title: String,
    content: String
});

var postModel = mongoose.model("Post", postSchema);

// USER has EMAIL, NAME
var userSchema = new mongoose.Schema({
    email: String,
    name: String,
    // now we associate a user with a post; specifically a lot of posts:
    // it has to be schema, NOT model!
    // you have to define the schema BEFORE the user schema
    posts: [postSchema]
});

var userModel = mongoose.model("User", userSchema);

// lets make a new user instance:
// var newUser = new userModel({
//     email: "hermione@gmail.com",
//     name: "Hermione"
// });

// newUser.posts.push({
//     title: "My instructions on polyjuice potion",
//     content: "Do it yourself!!!"
// });

// newUser.save(function(err, user) {
//     if(err) {
//         console.log(err);
//     } else {
//         console.log(user);
//     }
// });

// now lets make a new post instance:
// var newPost = new postModel({
//     title: "Yummy recipes...",
//     content: "Do whatever you like hehe"
// });

// newPost.save(function(err, post) {
//     if(err) {
//          console.log(err);
//      } else {
//          console.log(post);
//      }
// });

userModel.findOne({ name: "Hermione" }, function(err, user) {
    if(err) {
        // console.log(err);
    } else {
        // console.log(user);
        user.posts.push({
            title: "More instructions",
            content: "As I said, do it yourself."
        });
        user.save(function(err, user) {
            if(err) {
                console.log(err);
            } else {
                console.log(user);
            }
        });
    }
});