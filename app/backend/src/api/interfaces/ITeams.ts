export interface ITeams {
  id: number,
  teamName: string,
}

export interface ITeamsService {
  findAll(): Promise<ITeams[]>;
  findOne(id: number): Promise<ITeams | null>
}
