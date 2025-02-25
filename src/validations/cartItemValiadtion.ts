import Joi from 'joi';

export const cartItemValidationSchema = Joi.object({
  cart_id: Joi.string().required(), // Assuming cart_id is a string representation of ObjectId
  product_id: Joi.string().required(), // Assuming product_id is a string representation of ObjectId
  quantity: Joi.number().integer().min(1).required(),
});