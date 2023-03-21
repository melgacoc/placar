import Matches from '../../database/models/MatchModel';

export interface Match {
  id: number,
  homeTeam: number,
  homeTeamGoals: number,
  awayTeam: number,
  awayTeamGoals: number,
  inProgress: boolean,
  teamHome: {
    teamName: string,
  }
  teamAway: {
    teamName: string,
  }
}

export interface NewMatch {
  id: number,
  homeTeamId: number,
  awayTeamId: number,
  homeTeamGoals: number,
  awayTeamGoals: number,
  inProgress: boolean,
}

export interface IMatchesService {
  getAll(): Promise<Matches[]>;
  finishById(id: number): Promise<void>;
  updateById(id: number,
    homeTeamGoals: number,
    awayTeamGoals: number): Promise<void>;
  newMatch(homeTeamId: number,
    awayTeamId: number,
    homeTeamGoals: number,
    awayTeamGoals: number): Promise<NewMatch>;
}
