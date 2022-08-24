import * as Joi from 'joi';
import Validator from '../Validator';

const shcema = Joi.object({
  email: Joi.string().email().required()
    .messages({
      'string.empty': 'All fields must be filled',
      'string.email': 'Email must be valid',
    }),
  password: Joi.string().required()
    .messages({ 'string.empty': 'All fields must be filled' }),
});

const loginValidate = new Validator(shcema);

export default loginValidate;
