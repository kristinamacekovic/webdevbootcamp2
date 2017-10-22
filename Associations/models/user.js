var mongoose = require("mongoose");

var userSchema = new mongoose.Schema({
    email: String,
    name: String,
    // now we associate a user with a post; specifically a lot of posts:
    // it has to be schema, NOT model!
    // you have to define the schema BEFORE the user schema
    posts: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Post"
            }
        ]
});
// break up files and clean up code; modular code; can use in multiple files
module.exports = mongoose.model("User", userSchema);