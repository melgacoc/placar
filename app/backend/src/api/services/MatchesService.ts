import { ModelStatic } from 'sequelize';
import { IMatchesService } from '../interfaces/IMatchesService';
import TeamModel from '../../database/models/TeamModel';
import Matches from '../../database/models/MatchModel';

export default class MatchService implements IMatchesService {
  protected model: ModelStatic<Matches> = Matches;

  getAll = async (): Promise<Matches[]> => {
    const result = await this.model.findAll({
      include: [{
        model: TeamModel,
        as: 'homeTeam',
        attributes: ['teamName'],
      }, {
        model: TeamModel,
        as: 'awayTeam',
        attributes: ['teamName'],
      }],
    });

    return result;
  };

  finishById = async (id: number): Promise<void> => {
    await this.model.update({ inProgress: false }, { where: { id } });
  };

  updateById = async (
    id: number,
    homeTeamGoals: number,
    awayTeamGoals: number,
  ): Promise<void> => {
    await this.model.update(
      { homeTeamGoals, awayTeamGoals },
      { where: { id } },
    );
  };

  newMatch = async (
    homeTeamId: number,
    awayTeamId: number,
    homeTeamGoals: number,
    awayTeamGoals: number,
  ): Promise<Matches> => {
    const result = await this.model.create(
      homeTeamId,
      awayTeamId,
      homeTeamGoals,
      awayTeamGoals,
    );
    return result;
  };
}
