const express=require("express");
const router=express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing=require("../models/listing.js");
const {isLoggedIn, isOwner, validateListing} =require("../middleware.js");

const listingController=require("../controllers/listings.js");
// multer package for read multipart form 
const multer=require("multer");
const {storage}=require("../cloudConfig.js");
const upload=multer({storage});

// first route
router.route("/")
// index route return all data of listings
.get(wrapAsync(listingController.index))
// add new listing in database
.post(isLoggedIn,upload.single("listing[image]"),validateListing,wrapAsync(listingController.createListing));


// create new route it make first before show route because new read as id which could not find  
router.get("/new",isLoggedIn,listingController.newForm);

// route of all filters
router.get("/trending",listingController.trending);
router.get("/rooms",listingController.rooms);
router.get("/iconic_cities",listingController.iconicCities);
router.get("/mountains",listingController.mountains);
router.get("/castles",listingController.castles);
router.get("/amazing_pools",listingController.amazingPools);
router.get("/camping",listingController.camping);
router.get("/farms",listingController.farms);
router.get("/arctic",listingController.arctic);

//search the listings
router.post("/search",wrapAsync(listingController.search)); 

// second route
router.route("/:id")
// show route
.get(wrapAsync(listingController.showListing))
// update route
.put(isLoggedIn,isOwner,upload.single("listing[image]"),validateListing,wrapAsync(listingController.updateListing))
// delete route
.delete(isLoggedIn,isOwner,wrapAsync(listingController.deleteListing));


// edit route
router.get("/:id/edit",isLoggedIn,isOwner,wrapAsync(listingController.editForm));

module.exports=router;