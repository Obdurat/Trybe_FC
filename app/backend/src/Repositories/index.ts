import BaseRepository from './BaseRepository';
import { UserAttributes, TeamsAttributes, MatchesAttributes, ModelOk } from './Types';

export default class Repositories {
  private _users: BaseRepository<UserAttributes>;
  private _teams: BaseRepository<TeamsAttributes>;
  private _matches: BaseRepository<MatchesAttributes>;

  constructor(
    usersRepo: ModelOk<UserAttributes>,
    teamsRepo: ModelOk<TeamsAttributes>,
    matchesRepo: ModelOk<MatchesAttributes>,
  ) {
    this._users = new BaseRepository<UserAttributes>(usersRepo);
    this._teams = new BaseRepository<TeamsAttributes>(teamsRepo);
    this._matches = new BaseRepository<MatchesAttributes>(matchesRepo);
  }

  get Matches() { return this._matches; }
  get Users() { return this._users; }
  get Teams() { return this._teams; }
}
