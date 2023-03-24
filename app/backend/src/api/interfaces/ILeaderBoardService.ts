import Matches from '../../database/models/MatchModel';
import ILeaderBoard from './ILeaderBoard';

export default interface ILeaderBoardService {
  getFinishedMatches(): Promise<Matches[]>
  // resultByTeam(result: Matches[]): Promise<ILeaderBoard>
  renderLeaderboard(): Promise<ILeaderBoard[]>;
  leaderboard(): Promise<ILeaderBoard[]>;

}
