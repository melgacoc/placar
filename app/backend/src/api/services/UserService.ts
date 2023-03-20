import UserModel from '../../database/models/UserModel';
import IUserService from '../interfaces/IServiceUser';
import tokenStuffs from '../token/tokenGen';
// import IRole from '../interfaces/IRole';
import userValidation from '../middlewares/userValidation';

export default class UserService implements IUserService {
  login = async (email: string, password: string): Promise<string | null> => {
    const verify = await userValidation.isValid(email, password);
    if (!verify) {
      throw new Error('Invalid email or password');
    }

    const user = await UserModel.findOne({ where: { email } });
    if (!user) {
      return null;
    }
    return tokenStuffs.genToken(email, user.userName, user.role);
  };
}
