const mongoose=require("mongoose");
const initData=require("./data.js");
const Listing=require("../models/listing.js");

// connect database
const MONGO_URL="mongodb://127.0.0.1:27017/wonderlust";
main().then(()=>{
    console.log("connected to db");
}).catch(err=>{
    console.log(err);
})

async function main(){
    await mongoose.connect(MONGO_URL);
}

// used for reinitialize our database
const initDb=async ()=>{
    // clean all random data from database which already put in database
    await Listing.deleteMany({});
    // add owner property with all listing
    initData.data.forEach((obj) => {
        obj.owner = "6704a9a44db96b5dcfc98196";
      });
    await Listing.insertMany(initData.data);
    console.log("data was initialized");
}

initDb();