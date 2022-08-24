import { Router } from 'express';
import UserController from '../Controllers/User';
import TeamsController from '../Controllers/Teams';
import MatchesController from '../Controllers/Matches';
import loginValidate from '../Middlewares/Validation-Schemas/Login';
import verifyToken from '../Utils/jwt_Verify';

const endpoints: Router = Router();

const userController = new UserController();
const teamsController = new TeamsController();
const matchesController = new MatchesController();

endpoints.post('/login', loginValidate.validate, userController.login);
endpoints.get('/login/validate', userController.role);
endpoints.get('/teams', teamsController.teams);
endpoints.get('/teams/:id', teamsController.team);
endpoints.get('/matches', matchesController.matches);
endpoints.post('/matches', verifyToken, matchesController.addMatch);
endpoints.patch('/matches/:id', verifyToken, matchesController.matchGoals);
endpoints.patch('/matches/:id/finish', verifyToken, matchesController.matchStatus);

export default endpoints;
