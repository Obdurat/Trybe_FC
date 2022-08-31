import Repositories from '../Repositories';
import UserCases from './Users';
import MatchCases from './Matches';
import TeamCases from './Teams';
import LeaderboardCases from './Leaderboard';
import BoardCalc from './BoardCalc';

class CasesFactory {
  users = new UserCases(Repositories);
  matches = new MatchCases(Repositories);
  teams = new TeamCases(Repositories);
  leaderboard = new LeaderboardCases(Repositories, BoardCalc);
}

export default new CasesFactory();
