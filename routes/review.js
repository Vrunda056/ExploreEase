const express = require("express");
const router = express.Router({mergeParams:true});
const wrapasync = require("../utility/wrapasync.js");
const {validateReview, isLogin, isAuthor} = require("../middleware.js");
const reviewcollector = require("../collector/review.js");

//review rout
router.post("/",isLogin,validateReview, wrapasync(reviewcollector.reviewpost));

//review delete
router.delete("/:reviewId",isLogin,isAuthor,wrapasync(reviewcollector.reviewdelete));

module.exports = router;