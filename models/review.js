
const { ref } = require("joi");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    rating: {
        type: Number,
        min:1,
        max:5
    },
    createAt: {
        type: Date,
        default: Date.now()
    },
    comment: String,
    author:{
        type: Schema.Types.ObjectId,
        ref:"User"
    }
});

module.exports = mongoose.model("Review", reviewSchema);