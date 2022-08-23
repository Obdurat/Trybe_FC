import { Request, Response } from 'express';
import MatchesService from '../Services/Matches';
import ControllerWrapper from '../Utils/ControllerWrapper';

export default class MatchesController {
  private _service = new MatchesService();

  matches = ControllerWrapper(async (_req: Request, res: Response) => {
    const teams = await this._service.allMatches();
    return res.status(200).json(teams);
  });
}
