import TeamModel from '../../database/models/TeamModel';
import MaTchModel from '../../database/models/MatchModel';
import ILeaderBoard from '../interfaces/ILeaderBoard';
import ILeaderBoardService from '../interfaces/ILeaderBoardService';
import Matches from '../../database/models/MatchModel';

export default class LeaderboardService implements ILeaderBoardService {
      
      async getFinishedMatches () {
          const finished = await MaTchModel.findAll({ 
            include: [{
                model: TeamModel,
                as: 'homeTeam',
            }, {
                model: TeamModel,
                as: 'awayTeam',
            }],
            where: { inProgress: false },
            raw: true,
            nest: true, });
        return finished;
    }

    async getTeams () {
        const teams = await TeamModel.findAll({ raw: true, nest: true });
        return teams;
    }

    resultByTeam (result: Matches[]) {
        
        const newScore = {
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
          };
          
        const score = result.reduce((acc, crr) => {
            if ( crr.homeTeamGoals > crr.awayTeamGoals ) {
                acc.totalVictories +=1;
                acc.totalPoints +=3;
            } else if ( crr.homeTeamGoals === crr.awayTeamGoals ) {
                acc.totalDraws +=1;
                acc.totalPoints +=1;
            } else {
                acc.totalLosses +=1;
            }
            acc.goalsFavor += crr.homeTeamGoals;
            acc.goalsOwn += crr.awayTeamGoals;
            acc.totalGames += 1;
            return acc;
        }, newScore );
        return score;
    }

    async leaderboard(): Promise<ILeaderBoard[]> {
        const matches = await this.getFinishedMatches();
        const teams = await this.getTeams();
        return matches.map((e) => {
            const team = teams.find(({ id }) => id === e.homeTeamId) || { id: -1, teamName: '' };
            const team1 = matches.filter(({ homeTeamId }) => homeTeamId === team.id);
            const scoreBoardByTeam = this.resultByTeam(team1);
            scoreBoardByTeam.name = team.teamName;
            scoreBoardByTeam.goalsBalance = scoreBoardByTeam.goalsFavor - scoreBoardByTeam.goalsOwn;
            scoreBoardByTeam.efficiency = ((scoreBoardByTeam.totalPoints / (scoreBoardByTeam.totalGames * 3)) * 100).toFixed(2);
            return scoreBoardByTeam;
        });
    }

    async leaderboardHome(): Promise<ILeaderBoard[]> {
        const allTeams = await this.leaderboard();
        allTeams.sort((team1, team2) => (
          team2.totalPoints - team1.totalPoints
          || team2.totalVictories - team1.totalVictories
          || team2.goalsBalance - team1.goalsBalance
          || team2.goalsFavor - team1.goalsFavor
          || team2.goalsOwn - team1.goalsOwn
        ));
        return allTeams;
      }
}
