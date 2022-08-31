import { Request, Response } from 'express';
import ControllerWrapper from '../Utils/ControllerWrapper';
import CasesFactory from '../UseCases';

export default class LeaderboardController {
  private _useCases: typeof CasesFactory.leaderboard;

  constructor(useCases: typeof CasesFactory) {
    this._useCases = useCases.leaderboard;
  }

  home = ControllerWrapper(async (_req: Request, res: Response) => {
    const board = await this._useCases.run('homeTeam');
    return res.status(200).json(board);
  });

  away = ControllerWrapper(async (_req: Request, res: Response) => {
    const board = await this._useCases.run('awayTeam');
    return res.status(200).json(board);
  });

  all = ControllerWrapper(async (_req: Request, res: Response) => {
    const board = await this._useCases.run();
    return res.status(200).json(board);
  });
}
