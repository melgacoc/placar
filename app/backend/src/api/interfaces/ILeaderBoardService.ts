import Matches from '../../database/models/MatchModel';
import ILeaderBoard from './ILeaderBoard';

export default interface ILeaderBoardService {
  getFinishedMatches(): Promise<Matches[]>
  renderLeaderboard(): Promise<ILeaderBoard[]>;
}
