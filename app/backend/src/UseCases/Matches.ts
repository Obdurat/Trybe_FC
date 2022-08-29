import BaseRepository from '../Repositories/BaseRepository';
import { RepoDefined } from '../Repositories/RepoFactory';
import { MatchesAttributes, TeamsAttributes, updtAttr } from '../Repositories/Types';
import CustomError from '../Errors/CustomError';

export default class MatchCases {
  private _association: BaseRepository<TeamsAttributes>;
  private _repository: BaseRepository<MatchesAttributes>;

  constructor(repositories: RepoDefined) {
    this._repository = repositories._MatchesRepo;
    this._association = repositories._TeamsRepo;
  }

  async allMatches(where?: updtAttr<MatchesAttributes>) {
    const matches = await this._repository.getAll(undefined, { include: [
      { model: this._association.getModel(), as: 'teamHome', attributes: { exclude: ['id'] } },
      { model: this._association.getModel(), as: 'teamAway', attributes: { exclude: ['id'] } }],
    }, { raw: true, nest: true }, where);
    return matches;
  }

  async newMatch(match: MatchesAttributes) {
    if (match.homeTeam === match.awayTeam) {
      throw new CustomError('It is not possible to create a match with two equal teams', 401);
    }

    const teams = await this._association.getAll();

    const check = teams.some((team) =>
      team.get().id === match.homeTeam
    || team.get().id === match.awayTeam);

    if (!check) throw new CustomError('There is no team with such id!', 404);

    const newMatch = await this._repository.create({ ...match, inProgress: 1 });
    return newMatch.get();
  }

  async finishMatch(id: { id: number }): Promise<MatchesAttributes> {
    const match = await this._repository.update({ inProgress: 1 }, id);
    return match.get();
  }

  async updtMatchInProress(id: { id: number }, goals: updtAttr<MatchesAttributes>) {
    const match = await this._repository.update(goals, id);
    return match.get();
  }
}
