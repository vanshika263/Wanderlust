const mongoose=require("mongoose");
// describe schemma at single place instead of calling many times
const schema=mongoose.Schema;
const Review=require("./review.js");

const listingSchema=new schema({
    title:{
        type:String,
        required:true,
    },
    description:String,
    image:{
        url: String,
        filename: String,
    },
    price:Number,
    location:String,
    country:String,
    reviews:[
        {
            type: schema.Types.ObjectId,
            ref: "Review",
        }
    ],
    owner:{
        type:schema.Types.ObjectId,
        ref: "User",
    },
    category:{
        type: String,
        enum: ["trending","rooms","iconic cities","mountains","castles","amazing pools","camping","farms","arctic"]
    }
});

listingSchema.post("findOneAndDelete",async(listing)=>{
    if(listing){
        // if review array id match with these id then delete from array
        await Review.deleteMany({_id: {$in: listing.reviews}});
    }
});

// used for create model in database
const Listing=mongoose.model("Listing",listingSchema);
// now transfer in app.js file
module.exports=Listing;