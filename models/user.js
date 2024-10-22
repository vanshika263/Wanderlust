const mongoose=require("mongoose");
const Schema=mongoose.Schema;
const passportLocalMongoose=require("passport-local-mongoose");

// create user model for authentication
const userSchema=new Schema({
    email:{
        type: String,
        required: true
    }
});

// used passport local mongoose for add username, password and salt value
userSchema.plugin(passportLocalMongoose);

module.exports=mongoose.model('User',userSchema);