import { Request, Response } from 'express';
import ControllerWrapper from '../Utils/ControllerWrapper';
import CasesFactory from '../UseCases';

export default class UserController {
  private _useCase: typeof CasesFactory.users;

  constructor(useCase: typeof CasesFactory) {
    this._useCase = useCase.users;
  }

  login = ControllerWrapper(async (req: Request, res: Response) => {
    const token = await this._useCase.login(req.body);
    return res.status(200).json({ token });
  });

  role = ControllerWrapper(async (req, res) => {
    const role = await this._useCase.getRole(req.headers.authorization);
    return res.status(200).json({ role });
  });
}
