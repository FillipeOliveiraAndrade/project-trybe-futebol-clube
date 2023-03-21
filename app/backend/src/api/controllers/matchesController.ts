import { Request, Response } from 'express';
import { IMatchesService } from '../interfaces/IMatches';

class MatchesController {
  protected service: IMatchesService;

  constructor(service: IMatchesService) {
    this.service = service;
  }

  public findAllMatches = async (req: Request, res: Response) => {
    const { inProgress } = req.query;

    if (!inProgress) {
      const matches = await this.service.findAll();
      return res.status(200).json(matches);
    }

    const status = Boolean(inProgress === 'true');

    const matches = await this.service.findMatchesInProgress(status);
    return res.status(200).json(matches);
  };
}

export default MatchesController;
