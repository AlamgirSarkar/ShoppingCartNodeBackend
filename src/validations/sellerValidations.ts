import Joi from 'joi';

export const sellerValidationSchema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string(),
    pincodes: Joi.array().items(Joi.string().regex(/^\d{6}$/).messages({
        'string.pattern.base': 'Pincode must be a 6-digit number',
    })).required(),
    user_id: Joi.string(), // Assuming user_id is a string representation of ObjectId
});