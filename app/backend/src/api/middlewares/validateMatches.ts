import { NextFunction, Request, Response } from 'express';
import { ModelStatic } from 'sequelize';
import HttpException from '../utils/http.exception';

import TeamModel from '../../database/models/TeamModel';

class ValidateMatches {
  protected static model: ModelStatic<TeamModel> = TeamModel;

  public static checkHomeTeamAndAwayTeam = (req: Request, _res: Response, next: NextFunction) => {
    const { homeTeamId, awayTeamId } = req.body;

    if (homeTeamId === awayTeamId) {
      throw new HttpException(422, 'It is not possible to create a match with two equal teams');
    }

    return next();
  };

  public static checkTeamExists = async (req: Request, _res: Response, next: NextFunction) => {
    const { homeTeamId, awayTeamId } = req.body;

    const homeTeam = await this.model.findByPk(homeTeamId);
    const awayTeam = await this.model.findByPk(awayTeamId);

    if (!homeTeam || !awayTeam) {
      throw new HttpException(404, 'There is no team with such id!');
    }

    return next();
  };
}

export default ValidateMatches;
