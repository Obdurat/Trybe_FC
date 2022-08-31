import { Request, Response } from 'express';
import ControllerWrapper from '../Utils/ControllerWrapper';
import CasesFactory from '../UseCases';

export default class TeamsController {
  private _useCases: typeof CasesFactory.teams;

  constructor(useCases: typeof CasesFactory) {
    this._useCases = useCases.teams;
  }

  teams = ControllerWrapper(async (_req: Request, res: Response) => {
    const teams = await this._useCases.getTeams();
    return res.status(200).json(teams);
  });

  team = ControllerWrapper(async (req: Request, res: Response) => {
    const { id } = req.params;
    const team = await this._useCases.getTeam({ id: +id });
    return res.status(200).json(team);
  });
}
