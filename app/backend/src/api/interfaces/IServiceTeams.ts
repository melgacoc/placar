import ITeams from './Teams';

export default interface IServiceTeams {
  getAll(): Promise<ITeams[]>;
  getTeamById(id: number): Promise<ITeams | null>;
}
