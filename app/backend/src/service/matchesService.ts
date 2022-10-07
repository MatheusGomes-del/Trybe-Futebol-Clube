import TeamsModel from '../database/models/TeamsModel';
import MatchesModel from '../database/models/MacthesModel';

export default class matchesService {
  static async getAllMatches() {
    const model = MatchesModel;
    const matches = await model.findAll({
      include: [{
        model: TeamsModel,
        as: 'teamHome',
        attributes: ['teamName'],
      },
      {
        model: TeamsModel,
        as: 'teamAway',
        attributes: ['teamName'],
      }],
    });

    return matches;
  }
}
