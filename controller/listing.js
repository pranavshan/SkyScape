const Listing = require("../models/listing")

module.exports.index = async (req,res) =>{
    const allListings = await Listing.find({});
    res.render("listings/index.ejs",{allListings});
};

module.exports.renderNewForm = (req,res)=>{
    res.render("listings/new.ejs");
}

module.exports.showListing  = async (req,res)=>{
    let {id} = req.params;
    const listing = await Listing.findById(id)
    .populate({
        path:"reviews",
        populate:{
         path:"author",
        },
      })
    .populate("owner");
    if(!listing){
        req.flash("error","The listing you requested does not exist.");
        return res.redirect("/listings");
    }
    res.render("listings/show.ejs",{listing});
};


module.exports.createListing  = async (req,res)=>{
    // Method 1: let {title,description,image,price,country,location} = req.body;
    // Method 2 :
    // if(!req.body.listing){
    //     throw new ExpressError(400,"send valid data for listing");
    // }
    // console.log(req.body.listing);
    let url = req.file.path;
    let filename = req.file.filename; 
    const newListing = new Listing(req.body.listing); // created instance of object received from frontend form submission
    newListing.owner = req.user._id;
    newListing.image = {url,filename}
    // console.log(req.user);
    await newListing.save();
    req.flash("success","New listing created!");
    res.redirect("/listings");
};


module.exports.renderEditForm  = async (req,res)=>{
    let {id} = req.params;
    const listing = await Listing.findById(id);
    if(!listing){
        req.flash("error","The listing you requested does not exist.");
        return res.redirect("/listings");
    }
    let originalImageUrl = listing.image.url;
    originalImageUrl = originalImageUrl.replace("/upload","/upload/w_250");
    res.render("listings/edit.ejs",{listing,originalImageUrl});
};


module.exports.updateListing = async (req,res)=>{
    let {id} = req.params;
    let listing = await Listing.findByIdAndUpdate(id, {...req.body.listing}); // deconstucted javacript object request.body.Listing and sent it so that values can be updated
    if(typeof req.file !== "undefined"){
        let url = req.file.path;
        let filename = req.file.filename; 
        listing.image = {url,filename};
        await listing.save();
    }
    req.flash("success","Listing updated successfully!");
    res.redirect(`/listings/${id}`);
};

module.exports.destroyListing = async (req,res)=>{
    let {id} = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    req.flash("success","Listing deleted successfully!");
    res.redirect(`/listings`);
};

