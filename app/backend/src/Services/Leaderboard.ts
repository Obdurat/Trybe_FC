import Teams from './Teams';
import Matches from './Matches';

const teamsService = new Teams();
const matchesService = new Matches();

const teamMatches = async (place: string[]) => {
  const teams = await teamsService.allTeams();
  const test = await Promise.all(teams.map(async (e: { id: number, teamName: string }) => {
    const matches = await matchesService.finishedMatches(e.id, place[0]);
    return { teamName: e.teamName, matches };
  }));
  return test;
};

const teamPoints = (matches: any[], place: string[]) => matches.reduce((acc, match) => {
  if (match[`${place[0]}Goals`] > match[`${place[1]}Goals`]) return acc + 3;
  if (match[`${place[0]}Goals`] === match[`${place[1]}Goals`]) return acc + 1;
  return acc;
}, 0);

const teamVictories = (matches: any[], place: string[]) => matches.reduce((acc, match) => {
  if (match[`${place[0]}Goals`] > match[`${place[1]}Goals`]) return acc + 1;
  return acc;
}, 0);

const teamDraws = (matches: any[], place: string[]) => matches.reduce((acc, match) => {
  if (match[`${place[0]}Goals`] === match[`${place[1]}Goals`]) return acc + 1;
  return acc;
}, 0);

const teamLosses = (matches: any[], place: string[]) => matches.reduce((acc, match) => {
  if (match[`${place[0]}Goals`] < match[`${place[1]}Goals`]) return acc + 1;
  return acc;
}, 0);

const teamGoalsFavor = (matches: any[], place: string[]) => matches
  .reduce((acc, match) => acc + match[`${place[0]}Goals`], 0);

const teamGoalsAgainst = (matches: any[], place: string[]) => matches
  .reduce((acc, match) => acc + match[`${place[1]}Goals`], 0);

const points = ({ teamName, matches }: { teamName: string, matches: any[] }, place: string[]) => ({
  name: teamName,
  totalPoints: teamPoints(matches, place),
  totalGames: matches.length,
  totalVictories: teamVictories(matches, place),
  totalDraws: teamDraws(matches, place),
  totalLosses: teamLosses(matches, place),
  goalsFavor: teamGoalsFavor(matches, place),
  goalsOwn: teamGoalsAgainst(matches, place),
  goalsBalance: teamGoalsFavor(matches, place) - teamGoalsAgainst(matches, place),
  efficiency: +(((teamPoints(matches, place) / (matches.length * 3)) * 100).toFixed(2)),
});

const order = (board: any[]) => board.sort((a: any, b: any): any => {
  if (a.totalPoints > b.totalPoints) return -1;
  if (a.totalPoints < b.totalPoints) return 1;

  if (a.totalVictories > b.totalVictories) return -1;
  if (a.totalVictories < b.totalVictories) return 1;

  if (a.goalsBalance > b.goalsBalance) return -1;
  if (a.goalsBalance < b.goalsBalance) return 1;

  if (a.goalsFavor > b.goalsFavor) return -1;
  if (a.goalsFavor < b.goalsFavor) return 1;

  if (a.goalsOwn > b.goalsOwn) return -1;
  if (a.goalsOwn < b.goalsOwn) return 1;

  return 0;
});

const leaderboard = async (place: string[]) => teamMatches(place)
  .then((result) => result.map((e) => points(e, place))).then((final) => order(final));

export default leaderboard;
