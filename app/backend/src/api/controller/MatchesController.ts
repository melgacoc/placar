import { Request, Response } from 'express';
import { IMatchesService } from '../interfaces/IMatchesService';

export default class MatchesController {
  constructor(private matchesService: IMatchesService) {}

  public getAll = async (req: Request, res: Response) => {
    const matches = await this.matchesService.getAll();
    const { inProgress } = req.query;

    if (inProgress) {
      const filtered = matches.filter((e) => e.inProgress
        .toString() === inProgress);
      return res.status(200).json(filtered);
    }
    res.status(200).json(matches);
  };

  public finishById = async (req: Request, res: Response) => {
    const { id } = req.params;
    await this.matchesService.finishById(Number(id));
    res.status(200).json({ message: 'Finished' });
  };

  public updateById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { homeTeamGoals, awayTeamGoals } = req.body;
    await this.matchesService.updateById(Number(id), homeTeamGoals, awayTeamGoals);
    res.status(200).json({ message: 'Updated' });
  };

  public newMatch = async (req: Request, res: Response) => {
    const { homeTeamId,
      awayTeamId,
      homeTeamGoals,
      awayTeamGoals } = req.body;
    const match = await this.matchesService.newMatch(
      homeTeamId,
      awayTeamId,
      homeTeamGoals,
      awayTeamGoals,
    );
    res.status(201).json(match);
  };
}
