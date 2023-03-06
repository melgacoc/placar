import ITeams from '../interfaces/Teams';
import IServiceTeams from '../interfaces/IServiceTeams';
import TeamModel from '../../database/models/TeamModel';

export default class TeamService implements IServiceTeams {
  getAll = async (): Promise<ITeams[]> => {
    const result = await TeamModel.findAll();
    return result;
  };

  getTeamById = async (id: number): Promise<ITeams | null> => {
    const result = await TeamModel.findOne({ where: { id } });
    return result;
  };
}
