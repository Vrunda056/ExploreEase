const Joi = require('joi');

const validateLSchema = Joi.object({
    listing : Joi.object({
        title: Joi.string().required(),
        description: Joi.string().required(),
        country: Joi.string().required(),
        location: Joi.string().required(),
        image:{
            url:Joi.string().required(),
        },
        price: Joi.number().required(),
        category: Joi.array().items(Joi.string().valid(
            "Trending", "Food", "Luxe", "Mountains", "Domes", "Castles", "Farm", "Beach", "Arctic", "Boat",
            "Jungle", "Waterfalls", "Cityscape", "Caves", "Forests", "Nightlife", 
            "Hot Springs", "Wildlife", "Countryside", "Temples"
        )).required()

    }).required()
});

module.exports = {validateLSchema};

module.exports.validateRSchema = Joi.object({
    review : Joi.object({
        rating: Joi.number().required().min(1).max(5),
        comment: Joi.string().required()
    }).required()
})
