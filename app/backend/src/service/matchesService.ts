import { IMatch } from '../interface/IMatch';
import TeamsModel from '../database/models/TeamsModel';
import MatchesModel from '../database/models/MacthesModel';

export default class MatchesService {
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

  static async getMatchesInProgress(inProgress: boolean) {
    const model = MatchesModel;
    const matches = await model.findAll({
      where: { inProgress },
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

  static async insertMatches(match: object) {
    const model = MatchesModel;
    const newMatch = await model.create(match);

    return newMatch;
  }

  static async changeStatus(id: string): Promise<IMatch | null> {
    const model = MatchesModel;
    const match = await model.findByPk(id);

    if (!match) {
      return null;
    }

    const changedMatch = await match.update({ inProgress: false });

    return changedMatch;
  }

  static async updatedMatch(id: string, homeTeamGoals: number, awayTeamGoals: number):
  Promise<IMatch | null> {
    const model = MatchesModel;
    const matchUpdated = await model.findByPk(id);

    if (!matchUpdated) {
      return null;
    }

    const updatedMatch = await matchUpdated.update({ homeTeamGoals, awayTeamGoals });

    return updatedMatch;
  }
}
