const { model, models, Schema } = require("mongoose");

const ReviewSchema = new Schema({
    titleReview: String,
    descriptionReview: String,
    stars: Number,
    product: {type:Schema.Types.ObjectId}, 
},
    {
        timestamps: true,
    }
);

export const Review = models?.Review || model('Review', ReviewSchema);