import { Request, Response } from 'express';
import LeaderBoard from '../service/LeaderboardService';

export default class LeaderBoardController {
  static async getAllLeaderboard(req: Request, res: Response): Promise<Response> {
    const matches = await LeaderBoard.getAllLeaderboard();

    return res.status(200).json(matches);
  }
}
