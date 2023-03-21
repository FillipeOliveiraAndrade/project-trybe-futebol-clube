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

  public finishingMatchInProgress = async (req: Request, res: Response) => {
    const { id } = req.params;

    const { message } = await this.service.finishMatch(Number(id));

    return res.status(200).json(message);
  };

  public updateMatchesInProgress = async (req: Request, res: Response) => {
    const { id } = req.params;
    const payload = req.body;

    const { message } = await this.service.updateMatche(Number(id), payload);

    return res.status(200).json(message);
  };

  public addNewMatch = async (req: Request, res: Response) => {
    const newMatch = req.body;

    const matchAdded = await this.service.createNewMatch(newMatch);

    return res.status(201).json(matchAdded);
  };
}

export default MatchesController;
