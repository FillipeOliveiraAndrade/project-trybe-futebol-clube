import { ModelStatic } from 'sequelize';
import TeamModel from '../../database/models/TeamModel';
import { ITeams, ITeamsService } from '../interfaces/ITeams';

class TeamsService implements ITeamsService {
  protected model: ModelStatic<TeamModel> = TeamModel;

  public async findAll(): Promise<ITeams[]> {
    const teams = await this.model.findAll();
    return teams;
  }
}

export default TeamsService;
