import { AnySchema } from 'joi';
import { Request, Response, NextFunction } from 'express';

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

export default Validator;
