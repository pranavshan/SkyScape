const mongoose = require("mongoose");
const Schema = mongoose.Schema; // To avoid writing mongoose.Schema again and again
const Review = require("./review.js");

const listingSchema = new Schema({
    title:{
        type:String,
        required : true,
    },    
    description: String,
    image :{
       url:String,
       filename: String,
    // default: "https://unsplash.com/photos/time-lapse-photography-of-star-273_wcQPfYw"
    // set: (v) => v === "" ? "https://unsplash.com/photos/time-lapse-photography-of-star-273_wcQPfYw":v,
    },
    price: Number,
    location: String,
    country: String,
    reviews:[{
        type:Schema.Types.ObjectId,
        ref:"Review",
    }],
    owner:{
        type: Schema.Types.ObjectId,
        ref:"User",
    },
})

listingSchema.post("findOneAndDelete",async (listing)=>{
    if(listing){
        await Review.deleteMany({_id: {$in: listing.reviews}});
    }     
});

const Listing = mongoose.model("Listing",listingSchema)
module.exports = Listing;