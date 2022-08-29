import { RepoFactory, RepoCtrObj } from './RepoFactory';
import Matches from '../database/models/Matches';
import Users from '../database/models/User';
import Teams from '../database/models/Teams';
import { MatchesAttributes, ModelOk, TeamsAttributes } from './Types';

const Models: RepoCtrObj = {
  _UserRepo: Users,
  _TeamsRepo: Teams,
  _MatchesRepo: Matches,
  _AnotherRepo: Matches as ModelOk<MatchesAttributes>,
  _AndAnotherOne: Teams as ModelOk<TeamsAttributes> };

export default new RepoFactory(Models);
