import BaseRepository from '../Repositories/BaseRepository';
import { RepoDefined } from '../Repositories/RepoFactory';
import { TeamsAttributes, updtAttr } from '../Repositories/Types';
import Repos from '../Repositories';

export default class TeamCases {
  private _repository: BaseRepository<TeamsAttributes>;

  constructor(repositories: RepoDefined) {
    this._repository = repositories._TeamsRepo;
  }

  async getTeams() {
    const teams = await this._repository.getAll();
    return teams.map((team) => team.get());
  }

  async getTeam(option: updtAttr<TeamsAttributes>) {
    const team = await this._repository.getById(option);
    return team.get();
  }
}

const test = new TeamCases(Repos);
test.getTeam({ teamName: 'Napoli-SC' }).then((result) => console.dir(result, { depth: null }));
