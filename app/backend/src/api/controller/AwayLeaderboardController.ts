import { Request, Response } from 'express';
import ILeaderBoardService from '../interfaces/ILeaderBoardService';

export default class LeaderboardController {
  constructor(private leaderboardSevice: ILeaderBoardService) {}

  public async leaderboardHome1(_req: Request, res: Response): Promise<Response> {
    const leaderboard = await this.leaderboardSevice.leaderboard();
    const deleteDuplicates = leaderboard.filter((e, i) => (
      i === leaderboard.findIndex(
        (team) => team.name === e.name,
      )
    ));
    deleteDuplicates.sort((a, b) => (
      b.totalPoints - a.totalPoints
            || b.totalVictories - a.totalVictories
            || b.goalsBalance - a.goalsBalance
            || b.goalsFavor - a.goalsFavor
            || b.goalsOwn - a.goalsOwn
    ));
    return res.status(200).json(deleteDuplicates);
  }
}
