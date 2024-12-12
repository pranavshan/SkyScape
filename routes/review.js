const express = require("express")
const router = express.Router({mergeParams: true})
const wrapAsync = require("../utilis/wrapAsync.js")
const {isLoggedIn,validateReview,isReviewAuthor} = require("../middleware.js")
const ReviewController = require("../controller/review")

//Post Review Route
router.post("/",isLoggedIn, validateReview, wrapAsync(ReviewController.createReview));

// Delete Review Route
router.delete("/:reviewId",isLoggedIn,isReviewAuthor, wrapAsync(ReviewController.destroyReview));

module.exports = router;