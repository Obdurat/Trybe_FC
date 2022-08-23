import CustomError from '../Errors/CustomError';
import Teams from '../database/models/Teams';

export default class TeamService {
  private model = Teams;

  allTeams() {
    return this.model.findAll({ raw: true });
  }

  teamById(teamId: number | undefined) {
    if (!teamId) throw new CustomError('Id must be provided', 404);
    return this.model.findOne({ where: { id: teamId }, raw: true });
  }
}
