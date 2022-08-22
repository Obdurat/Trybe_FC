import { Router } from 'express';
import UserController from '../Controllers/User';

const endpoints: Router = Router();

const controller = new UserController();

endpoints.route('/login')
  .post(controller.login);

export default endpoints;
