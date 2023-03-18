import * as bcrypt from 'bcryptjs';
import UserModel from '../../database/models/UserModel';
// import IUser from '../interfaces/IUser';
import IUserService from '../interfaces/IServiceUser';
import IToken from '../interfaces/IToken';
import tokenStuffs from '../token/tokenGen';

export default class UserService implements IUserService {
  login = async (email: string, password: string): Promise<string | null> => {
    const user = await UserModel.findOne({ where: { email } });
    if (!user) {
      return null;
    }

    const validatePassword = await bcrypt.compare(password, user.password);
    if (!validatePassword) {
      return null;
    }

    const token = tokenStuffs.genToken(email);
    return token;
  };
}
