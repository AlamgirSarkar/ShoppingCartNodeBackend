import Joi from "joi";
export const validate = (schema: Joi.ObjectSchema, data: any) => {
  const { error, value } = schema.validate(data);
  if (error) {
    throw new Error(error?.details?.[0]?.message || 'Validation error');
  }
  return value;
};