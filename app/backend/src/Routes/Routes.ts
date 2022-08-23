import { Router } from 'express';
import UserController from '../Controllers/User';
import TeamsController from '../Controllers/Teams';
import MatchesController from '../Controllers/Matches';
import LoginValid from '../Utils/Validator';

const endpoints: Router = Router();

const userController = new UserController();
const teamsController = new TeamsController();
const matchesController = new MatchesController();

endpoints.post('/login', LoginValid.validate, userController.login);
endpoints.get('/login/validate', userController.role);
endpoints.get('/teams', teamsController.teams);
endpoints.get('/teams/:id', teamsController.team);
endpoints.get('/matches', matchesController.matches);

export default endpoints;
