import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import MatchesModel from '../database/models/MacthesModel';
import { JWT_SECRET } from '../helpers/token';
import { IAuthorization } from '../interface/IAuthorization';

const verifyMatch = async (req: Request, res: Response, next: NextFunction):
Promise<Response | undefined> => {
  const { homeTeam, awayTeam } = req.body;

  if (homeTeam === awayTeam) {
    return res.status(401).json(
      { message: 'It is not possible to create a match with two equal teams' },
    );
  }

  next();
};

const verifyToken = async (req: Request, res: Response, next: NextFunction):
Promise<Response | undefined> => {
  try {
    const { authorization } = req.headers as IAuthorization;
    jwt.verify(authorization, JWT_SECRET);

    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token must be a valid token' });
  }
};

const verifyTeams = async (req: Request, res: Response, next: NextFunction):
Promise<Response | undefined> => {
  const model = MatchesModel;

  const { homeTeam, awayTeam } = req.body;

  const _homeTeam = await model.findOne({ where: { homeTeam } });
  const _awayTeam = await model.findOne({ where: { awayTeam } });

  if (!_homeTeam || !_awayTeam) {
    return res.status(404).json({ message: 'There is no team with such id!' });
  }

  next();
};

export { verifyMatch, verifyToken, verifyTeams };
