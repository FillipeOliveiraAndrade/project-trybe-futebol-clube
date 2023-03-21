import MatcheModel from '../../database/models/MatcheModel';
import { IService } from './IService';

export type Payload = {
  homeTeamGoals: number,
  awayTeamGoals: number
};

export type ICreateMatch = {
  id?: number,
  homeTeamId: number,
  homeTeamGoals: number,
  awayTeamId: number,
  awayTeamGoals: number,
  inProgress?: boolean
};

export interface IMatchesService {
  findAll(): Promise<MatcheModel[]>
  findMatchesInProgress(query: boolean | undefined): Promise<MatcheModel[]>
  finishMatch(id: number): Promise<IService>
  updateMatche(id: number, payload: Payload): Promise<IService>
  createNewMatch(payload: ICreateMatch): Promise<ICreateMatch>
}
