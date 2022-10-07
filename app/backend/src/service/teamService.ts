import TeamsModel from '../database/models/TeamsModel';

export default class TeamService {
  static async getAllTeams() {
    const model = TeamsModel;
    const teams = await model.findAll();

    return teams;
  }

  static async getTeamById(id: string) {
    const model = TeamsModel;
    const team = await model.findOne({ where: { id } });

    return team;
  }
}
