import { ModelOk, UserAttributes, MatchesAttributes, TeamsAttributes } from './Types';
import BaseRepository from './BaseRepository';

type RepoCtrObj = {
  [index: string]: ModelOk<unknown>,
  _UserRepo: ModelOk<UserAttributes>,
  _TeamsRepo: ModelOk<TeamsAttributes>,
  _MatchesRepo: ModelOk<MatchesAttributes>
};

type RepoDefined = {
  [index: string]: BaseRepository<unknown>;
  _UserRepo: BaseRepository<UserAttributes>;
  _TeamsRepo: BaseRepository<TeamsAttributes>;
  _MatchesRepo: BaseRepository<MatchesAttributes>;
};

class RepoFactory implements RepoDefined {
  [index: string]: BaseRepository<unknown>;
  _UserRepo: BaseRepository<UserAttributes>;
  _TeamsRepo: BaseRepository<TeamsAttributes>;
  _MatchesRepo: BaseRepository<MatchesAttributes>;

  constructor(constructorObj: RepoCtrObj) {
    Object.keys(constructorObj).forEach((key) => {
      this[key] = new BaseRepository(constructorObj[key]);
    });
  }
}

export { RepoDefined, RepoFactory, RepoCtrObj };
