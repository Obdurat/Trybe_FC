import CustomError from '../Errors/CustomError';
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

  async newMatch(match: any) {
    if (match.homeTeam === match.awayTeam) {
      throw new CustomError('It is not possible to create a match with two equal teams', 401);
    }
    if (match.homeTeam > 16 || match.awayTeam > 16) {
      throw new CustomError('There is no team with such id!', 404);
    }
    const addedMatch = this.model.build({ ...match, inProgress: true });
    await addedMatch.save();
    return addedMatch;
  }

  async updateMatch(id: number) {
    const match = await this.model.findOne({ where: { id } });
    await match?.update({ inProgress: false });
    return ({ message: 'Finished' });
  }

  async updInProgressMatch(id: number, goals: any) {
    const match = await this.model.findOne({ where: { id } });
    await match?.update(goals);
    return match;
  }

  async finishedMatches(teamId: number, matchPlace: string) {
    const matches = await this.model.findAll({
      where: { [matchPlace]: teamId, inProgress: false }, raw: true });
    return matches;
  }
}
