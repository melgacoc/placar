import IRole from './IRole';

export default interface IUserService {
  login(email: string, password: string): Promise<string | null>;
  role(email: string): Promise<IRole | null>;
}
