const Listing = require("../models/listing");
const Review = require("../models/review");

module.exports.reviewpost = async(req,res) => {
    let listing = await Listing.findById(req.params.id);
    const newreview = new Review(req.body.review);
    newreview.author = req.user._id;
    listing.reviews.push(newreview);
    await listing.save();
    await newreview.save();
    req.flash("success","New Review Added!");
    res.redirect(`/test/${listing._id}`);
};

module.exports.reviewdelete = async(req,res) =>{
    let{id,reviewId} = req.params;
    await Listing.findByIdAndUpdate(id, {$pull: {reviews: reviewId}});
    await Review.findByIdAndDelete(reviewId);
    req.flash("success","Review deleted successfully!");
    res.redirect(`/test/${id}`);
};