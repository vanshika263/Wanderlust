const { response } = require("express");
const Listing=require("../models/listing");
// search route
module.exports.search = async (req, res) => {
    const { query } = req.body;
    if (query && query.trim()) {
      const regex = new RegExp(query.trim(), 'i'); // Case-insensitive search
      const searchQuery = {
        $or: [{ country: regex }, { title: regex }],
      };
      const results = await Listing.find(searchQuery);
      if(results.length===0){
        req.flash("error","No listing found");
        return res.redirect("/listings");
      }
      res.render("./listings/search.ejs",{results});
    } else {
      req.flash("error","Error found");
    }
  };

// index route function
module.exports.index=async(req,res)=>{
    const allListings=await Listing.find({});
    res.render("./listings/index.ejs",{allListings});
};

// trending route function
module.exports.trending=async(req,res)=>{
    const trendingListings=await Listing.find({category: "trending"});
    res.render("./listings/trending.ejs",{trendingListings});
};
// rooms route function
module.exports.rooms=async(req,res)=>{
    const roomsListings=await Listing.find({category: "rooms"});
    res.render("./listings/rooms.ejs",{roomsListings});
};
// iconic_cities route function
module.exports.iconicCities=async(req,res)=>{
    const iconicListings=await Listing.find({category: "iconic cities"});
    res.render("./listings/iconicCities.ejs",{iconicListings});
};
// mountains route function
module.exports.mountains=async(req,res)=>{
    const mountainsListings=await Listing.find({category: "mountains"});
    res.render("./listings/mountains.ejs",{mountainsListings});
};
// castles route function
module.exports.castles=async(req,res)=>{
    const castlesListings=await Listing.find({category: "castles"});
    res.render("./listings/castles.ejs",{castlesListings});
};
// amazing_pools route function
module.exports.amazingPools=async(req,res)=>{
    const poolsListings=await Listing.find({category: "amazing pools"});
    res.render("./listings/amazingPools.ejs",{poolsListings});
};
// camping route function
module.exports.camping=async(req,res)=>{
    const campingListings=await Listing.find({category: "camping"});
    res.render("./listings/camping.ejs",{campingListings});
};
// farms route function
module.exports.farms=async(req,res)=>{
    const farmsListings=await Listing.find({category: "farms"});
    res.render("./listings/farms.ejs",{farmsListings});
};
// arctic route function
module.exports.arctic=async(req,res)=>{
    const arcticListings=await Listing.find({category: "arctic"});
    res.render("./listings/arctic.ejs",{arcticListings});
};


// new route
module.exports.newForm=(req,res)=>{
    res.render("./listings/new.ejs");
};

// show route
module.exports.showListing=async(req,res)=>{
    let {id}=req.params;
    const listing=await Listing.findById(id).populate({path:"reviews",populate:{path: "author"}}).populate("owner");
    if(!listing){
        req.flash("error","Listing you requested for does not exists");
        res.redirect("/listings");
    }
    res.render("./listings/show.ejs",{listing});
};

// new listing in database
module.exports.createListing=async (req,res,next)=>{
    // url and filename get from cloudinary
    let url=req.file.path;
    let filename=req.file.filename;
    const newListing=new Listing(req.body.listing);
    // add owner which now logged in
    newListing.owner=req.user._id;
    newListing.image={url,filename};
    await newListing.save();
    req.flash("success","New listing created!");
    res.redirect("/listings");
};

// edit route
module.exports.editForm=async (req,res)=>{
    const {id}=req.params;
    const listing=await Listing.findById(id);
    if(!listing){
        req.flash("error","Listing you requested for does not exists");
        res.redirect("/listings");
    }
    // add effect on original image
    let originalImageUrl = listing.image.url;
    originalImageUrl = originalImageUrl.replace("/upload","/upload/w_250");
    res.render("./listings/edit.ejs",{listing, originalImageUrl});
};

// perform updation after edit
module.exports.updateListing=async (req,res)=>{
    const {id}=req.params;
    let listing=await Listing.findByIdAndUpdate(id,{...req.body.listing},{new: true});
    // for save image in mongo from cloudinary
    if(typeof req.file !== "undefined"){
    let url=req.file.path;
    let filename=req.file.filename;
    listing.image={url,filename};
    await listing.save();
    }
    req.flash("success","Listing Updated");
    res.redirect(`/listings/${id}`);
};

// delete route
module.exports.deleteListing=async(req,res)=>{
    let {id}=req.params;
    let deleteListing=await Listing.findByIdAndDelete(id);
    req.flash("success","Listing deleted");
    res.redirect("/listings");
};