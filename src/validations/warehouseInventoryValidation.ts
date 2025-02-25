import Joi from 'joi';

// Existing Validation Schemas (User, Order, OrderItem)

export const warehouseValidationSchema = Joi.object({
    name: Joi.string().required(),
    address: Joi.string().required(),
    latitude: Joi.number(),
    longitude: Joi.number(),
    region: Joi.string(),
});

export const inventoryValidationSchema = Joi.object({
    product_id: Joi.string().required(),
    warehouse_id: Joi.string().required(),
    stock: Joi.number().integer().min(0).required(),
});

export const validate = (schema: Joi.ObjectSchema, data: any) => {
  const { error, value } = schema.validate(data);
  if (error) {
    throw new Error(error?.details?.[0]?.message || 'Validation error');
  }
  return value;
};