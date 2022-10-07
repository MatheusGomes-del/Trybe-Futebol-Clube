import { Request, Response } from 'express';
import matchesService from '../service/matchesService';

export default class matchesController {
  static async getAllMatches(req: Request, res: Response): Promise<Response> {
    const matches = await matchesService.getAllMatches();

    return res.status(200).json(matches);
  }
}
