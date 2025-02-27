import Joi from 'joi';

export const productSchema = Joi.object({
  name: Joi.string().required().messages({
      'string.base': `"name" should be a type of 'text'`,
      'string.empty': `"name" cannot be an empty field`,
      'any.required': `"name" is a required field`
    }),
  description: Joi.string().messages({
      'string.base': `"description" should be a type of 'text'`
    }),
  price: Joi.number().required().positive().messages({
      'number.base': `"price" should be a type of 'number'`,
      'number.positive': `"price" must be a positive number`,
      'any.required': `"price" is a required field`
    }),
  category_id: Joi.string().required().hex().length(24).messages({
      'string.base': `"category_id" should be a type of 'text'`,
      'string.hex': `"category_id" must be a valid hexadecimal string`,
      'string.length': `"category_id" must be 24 characters long`,
      'any.required': `"category_id" is a required field`
    }),
  seller_id: Joi.string().required().hex().length(24).messages({
      'string.base': `"seller_id" should be a type of 'text'`,
      'string.hex': `"seller_id" must be a valid hexadecimal string`,
      'string.length': `"seller_id" must be 24 characters long`,
      'any.required': `"seller_id" is a required field`
    }),
  image_url: Joi.string().uri().messages({
      'string.base': `"image_url" should be a type of 'text'`,
      'string.uri': `"image_url" must be a valid URI`
    }),
  productType_id: Joi.string().hex().length(24).messages({
      'string.base': `"productType_id" should be a type of 'text'`, 
      'string.hex': `"productType_id" must be a valid hexadecimal string`,
      'string.length': `"productType_id" must be 24 characters long`,
      'any.required': `"productType_id" is a required field`
  }),
  stock: Joi.number().required().messages({
    'number.base': `"stock" should be a type of 'number'`,
    'any.required': `"stock" is a required field`
  })
});