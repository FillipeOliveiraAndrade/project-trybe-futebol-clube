import MatcheModel from '../../database/models/MatcheModel';

export interface IMatchesService {
  findAll(): Promise<MatcheModel[]>
  findMatchesInProgress(query: boolean | undefined): Promise<MatcheModel[]>
}
