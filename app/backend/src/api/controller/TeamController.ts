import { Request, Response } from 'express';
import IServiceTeams from '../interfaces/IServiceTeams';
// import TeamService from '../services/TeamService';

export default class TeamController {
  constructor(private teamService: IServiceTeams) {}

  getAll = async (_req: Request, res: Response) => {
    const result = await this.teamService.getAll();
    res.status(200).json(result);
  };

  getTeamById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await this.teamService.getTeamById(Number(id));
    res.status(200).json(result);
  };
}
