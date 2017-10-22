var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/blog_demo_2");

// in node you need the . for current folder!
var Post = require("./models/post")

// POST has TITLE, CONTENT
// var postSchema = new mongoose.Schema({
//     title: String,
//     content: String
// });

// var postModel = mongoose.model("Post", postSchema);

// USER has EMAIL, NAME
// var userSchema = new mongoose.Schema({
//     email: String,
//     name: String,
//     // now we associate a user with a post; specifically a lot of posts:
//     // it has to be schema, NOT model!
//     // you have to define the schema BEFORE the user schema
//     posts: [
//             {
//                 type: mongoose.Schema.Types.ObjectId,
//                 ref: "Post"
//             }
//         ]
// });

// var userModel = mongoose.model("User", userSchema);

var User = require("./models/user");

User.create({
    email: "bbelcher@hotmail.com",
    name: "Bob Belcher"
});

Post.create({
    title: "jombomombo",
    content: "blablablapricasbeezvezeee"
}, function(err, post) {
    User.findOne({email: "bbelcher@hotmail.com"}, function(err, foundUser) {
      if(err) {
          console.log(err);
      } else {
          foundUser.posts.push(post);
          foundUser.save(function(err, data) {
              if (err) {
                  console.log(err);
              } else {
                  console.log(data);
              }
          });
      }
    });
});

// find specific user
// find all posts for that user
// we get all of the content, not just the 
User.findOne({ email: "bbelcher@hotmail.com" }).populate("posts").exec(function(err, user) {
    if(err) {
        console.log(err);
    } else {
        console.log(user);
    }
});