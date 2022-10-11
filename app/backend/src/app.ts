import * as express from 'express';
import login from './middlewares/login';
import LoginController from './controller/loginController';
import TeamController from './controller/teamController';
import MatchesController from './controller/matchesController';
import { verifyMatch, verifyToken } from './middlewares/matchesVerification';
import LeaderBoardController from './controller/LeaderBoardController';

class App {
  public app: express.Express;

  constructor() {
    this.app = express();
    this.config();
    this.app.get('/', (req, res) => res.json({ ok: true }));
    this.app.post('/login', login.verifyLogin, login.verifyUser, LoginController.login);
    this.app.get('/login/validate', login.validateAuth, LoginController.validate);
    this.app.get('/teams', TeamController.getAllTeams);
    this.app.get('/teams/:id', TeamController.getTeamById);
    this.app.get('/matches', MatchesController.getAllMatches);
    this.app.get('/matches', MatchesController.getMatchesInProgress);
    this.app.post(
      '/matches',
      verifyMatch,
      verifyToken,
      MatchesController.insertMatches,
    );
    this.app.patch('/matches/:id/finish', MatchesController.changeStatus);
    this.app.patch('/matches/:id', MatchesController.updateMatch);
    this.app.get('/leaderboard/home', LeaderBoardController.getAllLeaderboard);
  }

  private config():void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(express.json());
    this.app.use(accessControl);
  }

  public start(PORT: string | number):void {
    this.app.listen(PORT, () => console.log(`Running on port ${PORT}`));
  }
}

export { App };

// A execução dos testes de cobertura depende dessa exportação
export const { app } = new App();
