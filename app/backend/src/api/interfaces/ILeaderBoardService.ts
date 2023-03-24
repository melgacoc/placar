import Matches from '../../database/models/MatchModel';
import ILeaderBoard from './ILeaderBoard';

export default interface ILeaderBoardService {
  getFinishedMatches(): Promise<Matches[]>
  // resultByTeam(result: Matches[], id: number): Promise<ILeaderBoard>
  leaderboardHome(): Promise<ILeaderBoard[]>;
  leaderboard(): Promise<ILeaderBoard[]>;
}
