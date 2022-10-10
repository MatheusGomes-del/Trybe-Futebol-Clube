import { Request, Response } from 'express';
// import { IMatch } from '../interface/IMatch';
import MatchesService from '../service/matchesService';

export default class MatchesController {
  static async getAllMatches(req: Request, res: Response): Promise<Response> {
    const matches = await MatchesService.getAllMatches();

    return res.status(200).json(matches);
  }

  static async getMatchesInProgress(req: Request, res: Response): Promise<Response> {
    const { inProgress } = req.query;

    if (!inProgress || (inProgress !== 'true' && inProgress !== 'false')) {
      return this.getAllMatches(req, res);
    }

    const progress = inProgress === 'true';
    const matches = await MatchesService.getMatchesInProgress(progress);

    return res.status(201).json(matches);
  }

  static async insertMatches(req: Request, res: Response): Promise<Response> {
    const { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals } = req.body;
    const inProgress = true;
    const match = await MatchesService.insertMatches({
      homeTeam, awayTeam, homeTeamGoals, awayTeamGoals, inProgress });

    return res.status(201).json(match);
  }

  static async changeStatus(req: Request, res: Response) {
    const { id } = req.params;

    const result = await MatchesService.changeStatus(id);

    if (!result) {
      return res.status(404).json({ message: 'NotFoundMatch' });
    }

    return res.status(200).json({ message: 'Finished' });
  }

  static async updateMatch(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { homeTeamGoals, awayTeamGoals } = req.body;

    const updatedMatch = await MatchesService.updatedMatch(id, homeTeamGoals, awayTeamGoals);

    return res.status(200).json(updatedMatch);
  }
}
