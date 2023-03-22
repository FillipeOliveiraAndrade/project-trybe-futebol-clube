import { col, fn, literal, ModelStatic, ProjectionAlias } from 'sequelize';
import TeamModel from '../../database/models/TeamModel';
import MatcheModel from '../../database/models/MatcheModel';
import { ILeaderBoardService } from '../interfaces/ILeaderBoard';

class LeaderBoardService implements ILeaderBoardService {
  protected model: ModelStatic<MatcheModel> = MatcheModel;

  public async homeTeamsPerformace(): Promise<MatcheModel[]> {
    return this.model.findAll({
      attributes: LeaderBoardService.buildHomeAttributes(),
      include: [{ model: TeamModel, as: 'homeTeam', attributes: [] }],
      group: ['home_team_id'],
      order: [
        ['totalPoints', 'DESC'],
        ['totalVictories', 'DESC'],
        ['goalsBalance', 'DESC'],
        ['goalsFavor', 'DESC'],
        ['goalsOwn', 'DESC'],
      ],
      where: { inProgress: false },
    });
  }

  public async awayTeamsPerformace(): Promise<MatcheModel[]> {
    return this.model.findAll({
      attributes: LeaderBoardService.buildAwayAttributes(),
      include: [{ model: TeamModel, as: 'awayTeam', attributes: [] }],
      group: ['away_team_id'],
      order: [
        ['totalPoints', 'DESC'],
        ['totalVictories', 'DESC'],
        ['goalsBalance', 'DESC'],
        ['goalsFavor', 'DESC'],
        ['goalsOwn', 'DESC'],
      ],
      where: { inProgress: false },
    });
  }

  private static buildHomeAttributes() {
    return [
      [literal('homeTeam.team_name'), 'name'],
      [literal(`
        CAST((SUM(home_team_goals > away_team_goals) * 3) +
        SUM(home_team_goals = away_team_goals) AS UNSIGNED)`), 'totalPoints'],
      [fn('COUNT', col('home_team_id')), 'totalGames'],
      [literal('CAST(SUM(home_team_goals > away_team_goals) AS UNSIGNED)'), 'totalVictories'],
      [literal('CAST(SUM(home_team_goals = away_team_goals) AS UNSIGNED)'), 'totalDraws'],
      [literal('CAST(SUM(away_team_goals > home_team_goals) AS UNSIGNED)'), 'totalLosses'],
      [literal('CAST(SUM(home_team_goals) AS UNSIGNED)'), 'goalsFavor'],
      [literal('CAST(SUM(away_team_goals) AS UNSIGNED)'), 'goalsOwn'],
      [literal('SUM(home_team_goals) - SUM(away_team_goals)'), 'goalsBalance'],
      [literal(`
        CAST(((SUM(home_team_goals > away_team_goals) * 3) +
        SUM(home_team_goals = away_team_goals)) / (COUNT(home_team_id) * 3) * 100
        AS DECIMAL(5,2))`), 'efficiency'],
    ].map(([exp, alias]) => [exp, alias] as ProjectionAlias);
  }

  private static buildAwayAttributes() {
    return [
      [literal('awayTeam.team_name'), 'name'],
      [literal(`
        CAST((SUM(away_team_goals > home_team_goals) * 3) +
        SUM(away_team_goals = home_team_goals) AS UNSIGNED)`), 'totalPoints'],
      [fn('COUNT', col('away_team_id')), 'totalGames'],
      [literal('CAST(SUM(away_team_goals > home_team_goals) AS UNSIGNED)'), 'totalVictories'],
      [literal('CAST(SUM(away_team_goals = home_team_goals) AS UNSIGNED)'), 'totalDraws'],
      [literal('CAST(SUM(home_team_goals > away_team_goals) AS UNSIGNED)'), 'totalLosses'],
      [literal('CAST(SUM(away_team_goals) AS UNSIGNED)'), 'goalsFavor'],
      [literal('CAST(SUM(home_team_goals) AS UNSIGNED)'), 'goalsOwn'],
      [literal('SUM(away_team_goals) - SUM(home_team_goals)'), 'goalsBalance'],
      [literal(`
        CAST(((SUM(away_team_goals > home_team_goals) * 3) +
        SUM(away_team_goals = home_team_goals)) / (COUNT(away_team_id) * 3) * 100
        AS DECIMAL(5,2))`), 'efficiency'],
    ].map(([exp, alias]) => [exp, alias] as ProjectionAlias);
  }
}

export default LeaderBoardService;
