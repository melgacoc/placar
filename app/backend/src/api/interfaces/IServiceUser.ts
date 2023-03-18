import IToken from './IToken';

export default interface IUserService {
  login(email: string, password: string): Promise<string | null>;
}
