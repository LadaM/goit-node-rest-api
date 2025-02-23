import Joi from "joi";

export const createContactSchema = Joi.object({
  name: Joi.string().min(3).max(30).required().messages({
    "string.base": "Name should be a type of text",
    "string.empty": "Name cannot be an empty field",
    "string.min": "Name should have at least 3 characters",
    "string.max": "Name should have at most 30 characters",
    "any.required": "Name is required"
  }),
  email: Joi.string().email().required().messages({
    "string.email": "Email must be a valid email",
    "string.empty": "Email cannot be empty",
    "any.required": "Email is a required"
  }),
  phone: Joi.string().pattern(/^\(\d{3}\) \d{3}-\d{4}$/).required().messages({
    "string.pattern.base": "Phone number must be in the format (XXX) XXX-XXXX",
    "string.empty": "Phone number cannot be empty",
    "any.required": "Phone number is required"
  })
});

export const updateContactSchema = Joi.object({
  name: Joi.string().min(3).max(30).messages({
    "string.base": "Name should be a type of text",
    "string.min": "Name should have at least 3 characters",
    "string.max": "Name should have at most 30 characters"
  }),
  email: Joi.string().email().messages({
    "string.email": "Email must be a valid email"
  }),
  phone: Joi.string().pattern(/^\(\d{3}\) \d{3}-\d{4}$/).messages({
    "string.pattern.base": "Phone number must be in the format (XXX) XXX-XXXX"
  })
}).min(1).messages({
  "object.min": "Body must have at least one field"
});
