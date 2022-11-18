import { Joi } from 'express-validation';

const fighterValidation = {
  getAll: {
    query: Joi.object({
      id: Joi.number().integer(),
      name: Joi.string().max(255),
      age: Joi.string().max(255),
      height: Joi.string().max(255),
      nickname: Joi.string().max(255),
      ufcRecord: Joi.string().max(255),
      mmaRecord: Joi.string().max(255),
    }),
  },
  create: {
    body: Joi.object({
      name: Joi.string().max(255).required(),
      age: Joi.string().max(255).required(),
      height: Joi.string().max(255),
      nickname: Joi.string().max(255),
      ufcRecord: Joi.string().max(255),
      mmaRecord: Joi.string().max(255),
    }),
  },
  update: {
    params: Joi.object({
      id: Joi.number().integer().required(),
    }),
    body: Joi.object({
      name: Joi.string().max(255).required(),
      age: Joi.string().max(255).required(),
      height: Joi.string().max(255).required(),
      nickname: Joi.string().max(255).required(),
      ufcRecord: Joi.string().max(255).required(),
      mmaRecord: Joi.string().max(255).required(),
    }),
  },
  partialUpdate: {
    params: Joi.object({
      id: Joi.number().integer().required(),
    }),
    body: Joi.object({
      name: Joi.string().max(255),
      age: Joi.string().max(255),
      height: Joi.string().max(255),
      nickname: Joi.string().max(255),
      ufcRecord: Joi.string().max(255),
      mmaRecord: Joi.string().max(255),
    }),
  },
  destroy: {
    params: Joi.object({
      id: Joi.number().integer().required(),
    }),
  },
};

export default fighterValidation;
