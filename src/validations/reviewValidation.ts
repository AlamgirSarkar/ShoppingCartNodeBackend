import Joi from 'joi';

export const reviewValidationSchema = Joi.object({
  user_id: Joi.string().required(), // Assuming user_id is a string representation of ObjectId
  product_id: Joi.string().required(), // Assuming product_id is a string representation of ObjectId
  rating: Joi.number().integer().min(1).max(5).required(),
  comment: Joi.string().allow(''), // Allow empty string for comment
});