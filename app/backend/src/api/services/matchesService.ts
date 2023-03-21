import { ModelStatic } from 'sequelize';
import TeamModel from '../../database/models/TeamModel';
import MatcheModel from '../../database/models/MatcheModel';
import { ICreateMatch, IMatchesService, Payload } from '../interfaces/IMatches';
import { IService } from '../interfaces/IService';

class MatchesService implements IMatchesService {
  protected model: ModelStatic<MatcheModel> = MatcheModel;

  public async findAll(): Promise<MatcheModel[]> {
    const matches = await this.model.findAll({
      include: [
        { model: TeamModel, as: 'homeTeam', attributes: { exclude: ['id'] } },
        { model: TeamModel, as: 'awayTeam', attributes: { exclude: ['id'] } },
      ],
    });
    return matches;
  }

  public async findMatchesInProgress(query: boolean | undefined): Promise<MatcheModel[]> {
    const matches = this.model.findAll({
      where: { inProgress: query },
      include: [
        { model: TeamModel, as: 'homeTeam', attributes: { exclude: ['id'] } },
        { model: TeamModel, as: 'awayTeam', attributes: { exclude: ['id'] } },
      ],
    });

    return matches;
  }

  public async finishMatch(id: number): Promise<IService> {
    await this.model.update(
      { inProgress: false },
      { where: { id } },
    );

    return { type: null, message: 'Finished' };
  }

  public async updateMatche(id: number, payload: Payload): Promise<IService> {
    const { homeTeamGoals, awayTeamGoals } = payload;

    await this.model.update(
      { homeTeamGoals, awayTeamGoals },
      { where: { id } },
    );

    return { type: null, message: 'Match updated' };
  }

  public async createNewMatch(payload: ICreateMatch): Promise<ICreateMatch> {
    const {
      homeTeamId,
      homeTeamGoals,
      awayTeamId,
      awayTeamGoals,
    } = payload;

    const { id } = await this.model.create({
      homeTeamId,
      homeTeamGoals,
      awayTeamId,
      awayTeamGoals,
      inProgress: true,
    });

    return { id, ...payload, inProgress: true };
  }
}

export default MatchesService;
