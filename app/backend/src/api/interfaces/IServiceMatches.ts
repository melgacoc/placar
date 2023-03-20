import IMatches from './IMatches';

export default interface IServiceMatches {
  getAll(): Promise<IMatches[]>;
}
