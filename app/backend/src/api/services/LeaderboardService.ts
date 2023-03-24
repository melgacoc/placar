import { ModelStatic } from 'sequelize';
import TeamModel from '../../database/models/TeamModel';
import MaTchModel from '../../database/models/MatchModel';
import ILeaderBoard from '../interfaces/ILeaderBoard';
import ILeaderBoardService from '../interfaces/ILeaderBoardService';
// import Matches from '../../database/models/MatchModel';

export default class LeaderboardService implements ILeaderBoardService {
  protected maTchModel: ModelStatic<MaTchModel> = MaTchModel;
  protected teamModel: ModelStatic<TeamModel> = TeamModel;

  async getFinishedMatches() {
    const finished = await this.maTchModel.findAll({
      include: [{
        model: TeamModel,
        as: 'homeTeam',
      }, {
        model: TeamModel,
        as: 'awayTeam',
      }],
      where: { inProgress: 0 },
      raw: true,
      nest: true });
    // console.log(finished);
    return finished;
  }

  async getTeams() {
    const teams = await this.teamModel.findAll({ raw: true, nest: true });
    return teams;
  }

  newScore = () => ({
    name: '',
    totalPoints: 0,
    totalGames: 0,
    totalVictories: 0,
    totalDraws: 0,
    totalLosses: 0,
    goalsFavor: 0,
    goalsOwn: 0,
    goalsBalance: 0,
    efficiency: '',
  });

  resultByTeam(result: MaTchModel[]) {
    const newScore = this.newScore();
    const score = result.reduce((acc, crr) => {
      if (crr.homeTeamGoals > crr.awayTeamGoals) {
        acc.totalVictories += 1;
        acc.totalPoints += 3;
      } else if (crr.homeTeamGoals === crr.awayTeamGoals) {
        acc.totalDraws += 1;
        acc.totalPoints += 1;
      } else {
        acc.totalLosses += 1;
      }
      acc.goalsFavor += crr.homeTeamGoals;
      acc.goalsOwn += crr.awayTeamGoals;
      acc.totalGames += 1;
      return acc;
    }, newScore);
    return score;
  }

  async leaderboard(): Promise<ILeaderBoard[]> {
    const matches = await this.getFinishedMatches();
    const teams = await this.getTeams();
    return matches.map((e) => {
      const team = teams.find(({ id }) => id === e.homeTeamId) || { id: -1, teamName: '' };
      const filteredTeams = matches.filter(({ homeTeamId }) => homeTeamId === team.id);
      const scoreBoardByTeam = this.resultByTeam(filteredTeams);
      scoreBoardByTeam.name = team.teamName;
      scoreBoardByTeam.goalsBalance = scoreBoardByTeam.goalsFavor - scoreBoardByTeam.goalsOwn;
      scoreBoardByTeam.efficiency = ((scoreBoardByTeam.totalPoints / (
        scoreBoardByTeam.totalGames * 3)) * 100).toFixed(2);
      return scoreBoardByTeam;
    });
  }

  async leaderboardHome(): Promise<ILeaderBoard[]> {
    const teams = await this.leaderboard();
    return teams;
  }
}
