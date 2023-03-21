import MatcheModel from '../../database/models/MatcheModel';
import { IService } from './IService';

export interface IMatchesService {
  findAll(): Promise<MatcheModel[]>
  findMatchesInProgress(query: boolean | undefined): Promise<MatcheModel[]>
  finishMatch(id: number): Promise<IService>
}
