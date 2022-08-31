import { RepoFactory, RepoCtrObj } from './RepoFactory';
import Matches from '../database/models/Matches';
import Users from '../database/models/User';
import Teams from '../database/models/Teams';

const Models: RepoCtrObj = {
  _UserRepo: Users,
  _TeamsRepo: Teams,
  _MatchesRepo: Matches };

export default new RepoFactory(Models);
