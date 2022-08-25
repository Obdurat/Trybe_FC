import { Request, Response } from 'express';
import leaderboard from '../Services/Leaderboard';
import ControllerWrapper from '../Utils/ControllerWrapper';

export default class LeaderboardController {
  private _service = leaderboard;

  home = ControllerWrapper(async (_req: Request, res: Response) => {
    const board = await this._service(['homeTeam', 'awayTeam']);
    return res.status(200).json(board);
  });

  away = ControllerWrapper(async (_req: Request, res: Response) => {
    const board = await this._service(['awayTeam', 'homeTeam']);
    return res.status(200).json(board);
  });
}
