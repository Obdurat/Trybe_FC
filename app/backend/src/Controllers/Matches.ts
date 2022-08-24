import { Request, Response } from 'express';
import MatchesService from '../Services/Matches';
import ControllerWrapper from '../Utils/ControllerWrapper';

export default class MatchesController {
  private _service = new MatchesService();

  matches = ControllerWrapper(async (_req: Request, res: Response) => {
    const teams = await this._service.allMatches();
    return res.status(200).json(teams);
  });

  addMatch = ControllerWrapper(async (req: Request, res: Response) => {
    const addedMatch = await this._service.newMatch(req.body);
    return res.status(201).json(addedMatch);
  });

  matchStatus = ControllerWrapper(async (req: Request, res: Response) => {
    const updatedMatch = await this._service.updateMatch(+req.params.id);
    return res.status(200).json(updatedMatch);
  });

  matchGoals = ControllerWrapper(async (req: Request, res: Response) => {
    const updatedMatch = await this._service.updInProgressMatch(+req.params.id, req.body);
    return res.status(200).json(updatedMatch);
  });
}
