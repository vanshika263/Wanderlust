const cloudinary=require("cloudinary").v2;
const {CloudinaryStorage} =require("multer-storage-cloudinary");

// config means joint backend with cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
});

// define storage
const storage=new CloudinaryStorage({
    cloudinary: cloudinary,
    params:{
        folder: "wonderlust_DEV",
        allowedFormats: ["png","jpg","jpeg"],
    },
});

module.exports={
    cloudinary,
    storage,
}