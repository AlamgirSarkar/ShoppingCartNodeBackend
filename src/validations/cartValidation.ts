import Joi from 'joi';

export const cartValidationSchema = Joi.object({
  user_id: Joi.string().required(), // Assuming user_id is a string representation of ObjectId
});