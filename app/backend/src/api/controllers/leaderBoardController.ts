import { Request, Response } from 'express';
import { ILeaderBoardService } from '../interfaces/ILeaderBoard';

class LeaderBoardController {
  protected service: ILeaderBoardService;

  constructor(service: ILeaderBoardService) {
    this.service = service;
  }

  public homeTeam = async (_req: Request, res: Response) => {
    const result = await this.service.homeTeamsPerformace();
    return res.status(200).json(result);
  };

  public awayTeam = async (_req: Request, res: Response) => {
    const result = await this.service.awayTeamsPerformace();
    return res.status(200).json(result);
  };
}

export default LeaderBoardController;
