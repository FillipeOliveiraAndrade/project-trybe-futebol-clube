import { Request, Response } from 'express';
import { IMatchesService } from '../interfaces/IMatches';

class MatchesController {
  protected service: IMatchesService;

  constructor(service: IMatchesService) {
    this.service = service;
  }

  public findAllMatches = async (req: Request, res: Response) => {
    const matches = await this.service.findAll();
    res.status(200).json(matches);
  };
}

export default MatchesController;
