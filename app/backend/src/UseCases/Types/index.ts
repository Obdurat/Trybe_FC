import { MatchesAttributes } from '../../Repositories/Types';

type BrdElement = {
  [index: string]: string | number | undefined;
  teamId?: number,
  name: string,
  totalPoints: number,
  totalGames: number,
  totalVictories: number,
  totalDraws: number,
  totalLosses: number,
  goalsFavor: number,
  goalsOwn: number,
  goalsBalance: number,
  efficiency: number
};

type getPlace = {
  thisTeam: 'awayTeamGoals' | 'homeTeamGoals',
  rival: 'awayTeamGoals' | 'homeTeamGoals',
};

type Calculator = {
  [index: string]: (matches: MatchesAttributes[], team: BrdElement) => number | string;
};

export { BrdElement, getPlace, Calculator };
