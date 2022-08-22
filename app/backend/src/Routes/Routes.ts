import { Router } from 'express';
import UserController from '../Controllers/User';

const endpoints: Router = Router();

const controller = new UserController();

endpoints.post('/login', controller.login);

export default endpoints;
