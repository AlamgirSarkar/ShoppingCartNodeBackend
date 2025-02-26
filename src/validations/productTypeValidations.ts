import Joi from 'joi';

// Previous validation schemas ...

export const productTypeValidationSchema = Joi.object({
  name: Joi.string().required().messages({
        'any.required': 'Product type name is required',
        'string.empty': 'Product type name cannot be empty'
    }),
  description: Joi.string().optional(),
});