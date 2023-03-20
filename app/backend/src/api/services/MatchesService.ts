import IServiceMatches from '../interfaces/IServiceMatches';
import MatchModel from '../../database/models/MatchModel';
import IMatches from '../interfaces/IMatches';
import TeamModel from '../../database/models/TeamModel';

export default class MatchesService implements IServiceMatches {
  getAll = async (): Promise<IMatches[]> => {
    const result = await MatchModel.findAll({
      include: [
        {
          model: TeamModel,
          as: 'teamHome',
          attributes: ['teamName'],
        },
        {
          model: TeamModel,
          as: 'teamAway',
          attributes: ['teamName'],
        },
      ],
    });
    return result;
  };
}
