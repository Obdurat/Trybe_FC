import Matches from '../database/models/Matches';
import Teams from '../database/models/Teams';

export default class MatchesService {
  private model = Matches;

  allMatches() {
    return this.model.findAll({ include: [
      { model: Teams, as: 'teamHome', attributes: { exclude: ['id'] } },
      { model: Teams, as: 'teamAway', attributes: { exclude: ['id'] } }],
    });
  }
}
