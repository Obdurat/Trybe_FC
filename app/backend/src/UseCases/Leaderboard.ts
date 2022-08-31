import BaseRepository from '../Repositories/BaseRepository';
import { RepoDefined } from '../Repositories/RepoFactory';
import { TeamsAttributes, MatchesAttributes } from '../Repositories/Types';
import { BrdElement, Calculator } from './Types';

export default class LeaderboardCases {
  private _teamsRepository: BaseRepository<TeamsAttributes>;
  private _matchesRepository: BaseRepository<MatchesAttributes>;
  private _matches: MatchesAttributes[];
  private _calculator: Calculator;

  constructor(repositories: RepoDefined, calculator: Calculator) {
    this._teamsRepository = repositories._TeamsRepo;
    this._matchesRepository = repositories._MatchesRepo;
    this._calculator = calculator;
  }

  private async brdCreate(): Promise<BrdElement[]> {
    const teams = await this._teamsRepository.getAll();
    console.log(teams);
    return teams.map((team) => ({
      teamId: team.get().id,
      name: team.get().teamName,
      totalPoints: 0,
      totalGames: 0,
      totalVictories: 0,
      totalDraws: 0,
      totalLosses: 0,
      goalsFavor: 0,
      goalsOwn: 0,
      goalsBalance: 0,
      efficiency: 0,
    }));
  }

  private async allMatches() {
    const matches = await this._matchesRepository.getAll();
    this._matches = matches.map((match) => match.get());
  }

  private matchesByTeamPlace(team: BrdElement, place?: 'homeTeam' | 'awayTeam' | undefined) {
    const matches = this._matches;

    if (place) return matches.filter((match) => match[place] === team.teamId);

    return matches
      .filter((match) => match.awayTeam === team.teamId || match.homeTeam === team.teamId);
  }

  private pointsCalc(team: BrdElement, place?: 'homeTeam' | 'awayTeam' | undefined) {
    const matches = this.matchesByTeamPlace(team, place);
    const copy = Object.keys(team).slice(2);
    // eslint-disable-next-line no-return-assign, no-param-reassign
    copy.forEach((key) => team[key] = this._calculator[key](matches, team));
  }

  async run(place?: 'homeTeam' | 'awayTeam') {
    const board = await this.brdCreate();
    await this.allMatches();
    board.forEach((team) => this.pointsCalc(team, place));
    return board;
  }
}
