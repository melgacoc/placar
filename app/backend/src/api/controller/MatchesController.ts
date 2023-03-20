import { Request, Response } from 'express';
import IServiceMatches from '../interfaces/IServiceMatches';

export default class MatchesController {
  constructor(private matchService: IServiceMatches) {}

  public async getAll(req: Request, res: Response): Promise<Response> {
    const matches = await this.matchService.getAll();
    return res.status(200).json(matches);
  }
}
