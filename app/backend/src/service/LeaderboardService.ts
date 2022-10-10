import MatchesModel from '../database/models/MacthesModel';
// import { IMatch } from '../interface/IMatch';

export default class LeaderBoard {
  static async getAllLeaderboard() {
    const model = MatchesModel;
    const matches = await model.findAll({ where: { inProgress: false } });

    return matches;
  }
}
