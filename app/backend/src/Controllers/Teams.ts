import { Request, Response } from 'express';
import TeamService from '../Services/Teams';
import ControllerWrapper from '../Utils/ControllerWrapper';

export default class TeamsController {
  private _service = new TeamService();

  teams = ControllerWrapper(async (_req: Request, res: Response) => {
    const teams = await this._service.allTeams();
    return res.status(200).json(teams);
  });

  team = ControllerWrapper(async (req: Request, res: Response) => {
    const { id } = req.params;
    const team = await this._service.teamById(+id);
    return res.status(200).json(team);
  });
}
