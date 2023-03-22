import MatcheModel from '../../database/models/MatcheModel';

export interface ILeaderboard {
  name: string,
  totalPoints: number,
  totalGames: number,
  totalVictories: number,
  totalDraws: number,
  totalLosses: number,
  goalsFavor: number,
  goalsOwn: number,
  goalsBalance: number,
  efficiency: number
}

export interface ILeaderBoardService {
  homeTeamsPerformace(): Promise<MatcheModel[]>;
  awayTeamsPerformace(): Promise<MatcheModel[]>;
}
