const mongoose=require("mongoose");
// describe schemma at single place instead of calling many times
const schema=mongoose.Schema;

const reviewSchema=new schema({
    comment: String,
    rating: {
        type: Number,
        min: 1,
        max: 5
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    author:{
        type: schema.Types.ObjectId,
        ref: "User",
    }
});

module.exports=mongoose.model("Review",reviewSchema);