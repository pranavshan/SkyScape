const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new Schema({
    email:{
        type:String,
        require,
    },
});

userSchema.plugin(passportLocalMongoose);
// passportLocalMongoose:username,salting and hash password it adds automatically,so we used it
module.exports = mongoose.model('User',userSchema);