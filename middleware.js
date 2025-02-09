const Listing = require("./models/listing.js");
const Review = require("./models/review.js");
const {validateLSchema} = require("./schema.js");
const {validateRSchema} = require("./schema.js");
const expressError = require("./utility/expressError.js");

const isLogin = (req,res,next) =>{
    if(! req.isAuthenticated()){
       req.session.redirectUrl = req.originalUrl;
        req.flash("error" , "you must be login!!");
       return res.redirect("/login");
    }
    next();
};

module.exports = {isLogin};

module.exports.validateListing = (req,res,next) =>{
    let{error} = validateLSchema.validate(req.body);
    if(error){
        throw(new expressError(400, error))
    }else{
        next();
    }
};

module.exports.validateReview = (req,res,next) =>{
    let{error} = validateRSchema.validate(req.body);
    if(error){
        throw(new expressError(400, error))
    }else{
        next();
    }
};

module.exports.isOwner = async(req,res,next) =>{
    let {id} = req.params;
    const list = await Listing.findById(id);
    if(!list.owner.equals(res.locals.curruser._id)){
        req.flash("error", "you are not owner of this listing");
        return res.redirect(`/test/${id}`);
    }
    next();
};

module.exports.isAuthor = async(req,res,next) =>{
    let {id,reviewId} = req.params;
    const review = await Review.findById(reviewId);
    if(!review.author.equals(res.locals.curruser._id)){
        req.flash("error", "you are not owner of this review");
        return res.redirect(`/test/${id}`);
    }
    next();
};
