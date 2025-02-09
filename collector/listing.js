const Listing = require("../models/listing");

module.exports.index = async (req, res, next) => {
    let searchQuery = req.query.search || ""; // Get search input from URL
    let filter = searchQuery
        ? { title: { $regex: searchQuery, $options: "i" } } // Case-insensitive search
        : {}; // If no search, fetch all listings

    const alllist = await Listing.find(filter); // Fetch filtered or all listings
    res.render("listings/index.ejs", { alllist, searchQuery });
};


module.exports.showfilter = async(req,res,next) => {
    const category = req.query.category; // Get category from query parameter
    const alllist =  await Listing.find({category:category});
    if(alllist.length===0){
        req.flash("error","Requested category palces is not available");
        res.redirect("/test");
    }else{
    res.render("listings/index.ejs", {alllist});
    }
};

module.exports.newget = async(req,res,next) => {
    res.render("listings/new.ejs");
};

module.exports.newpost = async(req,res,next) => {
    let url = req.file.path;
    let filename = req.file.filename;
    let newlist = new Listing(req.body.listing);
    newlist.image = {url,filename};
    newlist.owner = req.user._id;
    await newlist.save();
    req.flash("success","New Listing Created!");
    res.redirect("/test");
};

module.exports.editget = async(req,res,next) => {
    let {id} = req.params;
    const list = await Listing.findById(id);
    if(!list){
        req.flash("error","Listing you reqested for was deleted");
        res.redirect("/test");
    }
    let blurimage = list.image.url.replace("/upload", "/upload/w_250");
    res.render("listings/edit.ejs",{list,blurimage});
};

module.exports.editput = async(req,res,next) => {
    let {id} = req.params;
    let newlist = await Listing.findByIdAndUpdate(id,{ ...req.body.listing });
    
    if(typeof req.file !== "undefined"){
        let url = req.file.path;
        let filename = req.file.filename;
        newlist.image = {url,filename};
        await newlist.save();
    }
    
    req.flash("success","Listing edited successfully!");
    res.redirect(`/test/${id}`);
};

module.exports.delete = async(req,res,next) => {
    let {id} = req.params;
    const deletelist = await Listing.findByIdAndDelete(id);
    console.log(deletelist);
    req.flash("success","Listing deleted successfully!");
    res.redirect("/test");
};
module.exports.show = async(req,res,next) => {
    let {id} = req.params;
    const l = await Listing.findById(id).populate({path:"reviews",populate:{path:"author"}}).populate("owner");
    if(!l){
        req.flash("error","Listing you reqested for was deleted");
        res.redirect("/test");
    }
    res.render("listings/show.ejs",{l});
};

