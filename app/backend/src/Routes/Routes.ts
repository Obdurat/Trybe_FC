import { Router } from 'express';
import UserController from '../Controllers/User';
import TeamsController from '../Controllers/Teams';
import MatchesController from '../Controllers/Matches';
import LeaderboardController from '../Controllers/Leaderboard';
import loginValidate from '../Middlewares/Validation-Schemas/Login';
import verifyToken from '../Utils/jwt_Verify';
import CasesFactory from '../UseCases';

const endpoints: Router = Router();

const userController = new UserController(CasesFactory);
const teamsController = new TeamsController(CasesFactory);
const matchesController = new MatchesController(CasesFactory);
const leaderboardController = new LeaderboardController(CasesFactory);

endpoints.post('/login', loginValidate.validate, userController.login);
endpoints.get('/login/validate', userController.role);
endpoints.get('/teams', teamsController.teams);
endpoints.get('/teams/:id', teamsController.team);
endpoints.get('/matches', matchesController.matches);
endpoints.post('/matches', verifyToken, matchesController.addMatch);
endpoints.patch('/matches/:id', verifyToken, matchesController.matchGoals);
endpoints.patch('/matches/:id/finish', verifyToken, matchesController.matchStatus);
endpoints.get('/leaderboard/home', leaderboardController.home);
endpoints.get('/leaderboard/away', leaderboardController.away);
endpoints.get('/leaderboard', leaderboardController.all);

export default endpoints;
