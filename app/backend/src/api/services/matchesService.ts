import { ModelStatic } from 'sequelize';
import TeamModel from '../../database/models/TeamModel';
import MatcheModel from '../../database/models/MatcheModel';
import { IMatchesService } from '../interfaces/IMatches';

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
}

export default MatchesService;
