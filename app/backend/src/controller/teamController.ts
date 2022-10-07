import { Request, Response } from 'express';
import TeamService from '../service/teamService';

export default class TeamController {
  static async getAllTeams(req: Request, res: Response): Promise<Response> {
    const teams = await TeamService.getAllTeams();

    return res.status(200).json(teams);
  }

  static async getTeamById(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const team = await TeamService.getTeamById(id);

    return res.status(200).json(team);
  }
}
