import { Request, Response } from 'express';
import { ITeamsService } from '../interfaces/ITeams';

class TeamsController {
  protected service: ITeamsService;

  constructor(service: ITeamsService) {
    this.service = service;
  }

  public getAllTeams = async (_req: Request, res: Response) => {
    const teams = await this.service.findAll();
    return res.status(200).json(teams);
  };

  public getTeamForId = async (req: Request, res: Response) => {
    const { id } = req.params;

    const team = await this.service.findOne(Number(id));
    return res.status(200).json(team);
  };
}

export default TeamsController;
