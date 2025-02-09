const express = require("express");
const router = express.Router();
const wrapasync = require("../utility/wrapasync.js");
const {isLogin, validateListing, isOwner}  = require("../middleware.js");
const listingcollector = require("../collector/listing.js");
const multer  = require('multer');
const {storage} = require("../cloudConfig.js");
const upload = multer({ storage });

// index rout
router.get("/",wrapasync(listingcollector.index));

// filter rout
router.get("/filter",wrapasync(listingcollector.showfilter));

// new rout
router.get("/new",isLogin,wrapasync(listingcollector.newget));
router.post("/",isLogin,upload.single('listing[image]'),validateListing,wrapasync(listingcollector.newpost));

// edit rout
router.get("/:id/edit",isLogin,isOwner,wrapasync(listingcollector.editget));
router.put("/:id",isLogin,isOwner,upload.single('listing[image]'),validateListing,wrapasync(listingcollector.editput));

// show rout
router.get("/:id",wrapasync(listingcollector.show));

// delete rout
router.delete("/:id",isLogin,isOwner,wrapasync(listingcollector.delete));


module.exports = router;