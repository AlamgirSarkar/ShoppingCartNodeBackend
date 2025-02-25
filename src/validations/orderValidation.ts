import Joi from 'joi';

export const orderValidationSchema = Joi.object({
    user_id: Joi.string().required(), // Assuming user_id is a string representation of ObjectId
    total_price: Joi.number().required().positive(),
    status: Joi.string().valid('pending', 'paid', 'shipped', 'delivered', 'cancelled').default('pending'), // Assuming an enum
});

export const orderItemValidationSchema = Joi.object({
    order_id: Joi.string().required(), // Assuming order_id is a string representation of ObjectId
    product_id: Joi.string().required(), // Assuming product_id is a string representation of ObjectId
    quantity: Joi.number().required().integer().positive(),
    price: Joi.number().required().positive(),
});

export const validate = (schema: Joi.ObjectSchema, data: any) => {
  const { error, value } = schema.validate(data);
  if (error) {
    throw new Error(error?.details?.[0]?.message || 'Validation error');
  }
  return value;
};