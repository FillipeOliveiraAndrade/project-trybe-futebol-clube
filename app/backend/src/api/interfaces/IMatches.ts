import MatcheModel from '../../database/models/MatcheModel';

export interface IMatchesService {
  findAll(): Promise<MatcheModel[]>
}
