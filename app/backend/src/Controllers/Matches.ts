import { Request, Response } from 'express';
import ControllerWrapper from '../Utils/ControllerWrapper';
import CasesFactory from '../UseCases';

export default class MatchesController {
  private _useCase: typeof CasesFactory.matches;

  constructor(useCases: typeof CasesFactory) {
    this._useCase = useCases.matches;
  }

  matches = ControllerWrapper(async (_req: Request, res: Response) => {
    const teams = await this._useCase.allMatches();
    return res.status(200).json(teams);
  });

  addMatch = ControllerWrapper(async (req: Request, res: Response) => {
    const addedMatch = await this._useCase.newMatch(req.body);
    return res.status(201).json(addedMatch);
  });

  matchStatus = ControllerWrapper(async (req: Request, res: Response) => {
    const updatedMatch = await this._useCase.finishMatch({ id: +req.params.id });
    return res.status(200).json(updatedMatch);
  });

  matchGoals = ControllerWrapper(async (req: Request, res: Response) => {
    const updatedMatch = await this._useCase.updtMatchInProress({ id: +req.params.id }, req.body);
    return res.status(200).json(updatedMatch);
  });
}
