import { AnySchema } from 'joi';
import { Request, Response, NextFunction } from 'express';
import * as Joi from 'joi';

class Validator {
  constructor(private schema: AnySchema) {
    this.schema = schema;
    this.validate = this.validate.bind(this);
  }

  validate(req: Request, res: Response, next: NextFunction) {
    const valid = this.schema.validate(req.body);
    if (valid.error) return res.status(400).json({ message: valid.error.details[0].message });
    next();
  }
}

const shcema = Joi.object({
  email: Joi.string().email().required()
    .messages({
      'string.empty': 'All fields must be filled',
      'string.email': 'Email must be valid',
    }),
  password: Joi.string().required()
    .messages({ 'string.empty': 'All fields must be filled' }),
});

const LoginValid = new Validator(shcema);

export default LoginValid;
