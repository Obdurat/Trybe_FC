import { MatchesAttributes } from '../Repositories/Types';
import { BrdElement, getPlace, Calculator } from './Types';

const teamPlace = (match: MatchesAttributes, team: BrdElement): getPlace => {
  const thisTeam = match.awayTeam === team.teamId ? 'awayTeamGoals' : 'homeTeamGoals';
  const rival = match.awayTeam === team.teamId ? 'homeTeamGoals' : 'awayTeamGoals';
  return ({ thisTeam, rival });
};

class BoardCalc implements Calculator {
  [index: string]: (matches: MatchesAttributes[], team: BrdElement) => number;

  totalLosses = (matches: MatchesAttributes[], team: BrdElement) => matches.reduce((acc, match) => {
    const { thisTeam, rival } = teamPlace(match, team);
    if (match[thisTeam] < match[rival]) return acc + 1;
    return acc;
  }, 0);

  totalPoints = (matches: MatchesAttributes[], team: BrdElement) => matches.reduce((acc, match) => {
    const { thisTeam, rival } = teamPlace(match, team);
    if (match[thisTeam] > match[rival]) return acc + 3;
    if (match[thisTeam] === match[rival]) return acc + 1;
    return acc;
  }, 0);

  totalVictories = (matche:MatchesAttributes[], team:BrdElement) => matche.reduce((acc, match) => {
    const { thisTeam, rival } = teamPlace(match, team);
    if (match[thisTeam] > match[rival]) return acc + 1;
    return acc;
  }, 0);

  totalDraws = (matches: MatchesAttributes[], team: BrdElement) => matches.reduce((acc, match) => {
    const { thisTeam, rival } = teamPlace(match, team);
    if (match[thisTeam] === match[rival]) return acc + 1;
    return acc;
  }, 0);

  goalsFavor = (matches: MatchesAttributes[], team: BrdElement) => matches.reduce((acc, match) => {
    const { thisTeam } = teamPlace(match, team);
    return acc + match[thisTeam];
  }, 0);

  goalsOwn = (matches: MatchesAttributes[], team: BrdElement) => matches.reduce((acc, match) => {
    const { rival } = teamPlace(match, team);
    return acc + match[rival];
  }, 0);

  totalGames = (matches: MatchesAttributes[]) => matches.length;

  goalsBalance = (matches: MatchesAttributes[], team: BrdElement) =>
    this.goalsFavor(matches, team) - this.goalsOwn(matches, team);

  efficiency = (matches: MatchesAttributes[], team: BrdElement) =>
    +(((this.totalPoints(matches, team) / (matches.length * 3)) * 100)).toFixed(2);
}

export default new BoardCalc();
