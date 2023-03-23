import { Request, Response } from 'express';
import  ILeaderBoardService from '../interfaces/ILeaderBoardService';

export default class LeaderboardController {
    constructor(private leaderboardSevice: ILeaderBoardService) {}
    
    public async leaderboardHome1(_req: Request, res: Response): Promise<Response> {
        const leaderboard = await this.leaderboardSevice.leaderboard();
        return res.status(200).json(leaderboard);
    }
}