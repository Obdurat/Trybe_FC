import { Request, Response } from 'express';
import UserService from '../Services/User';
import ControllerWrapper from '../Utils/ControllerWrapper';

export default class UserController {
  private _service = new UserService();

  login = ControllerWrapper(async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const token = await this._service.login(email, password);
    return res.status(200).json({ token });
  });

  role = ControllerWrapper(async (req, res) => {
    const role = await this._service.getRole(req.headers.authorization);
    return res.status(200).json({ role });
  });
}
