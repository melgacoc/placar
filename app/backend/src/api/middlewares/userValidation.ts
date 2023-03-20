import { Response, Request, NextFunction } from 'express';
import { compare } from 'bcryptjs';
import UserModel from '../../database/models/UserModel';
// import IUser from '../interfaces/IUser';

export default class UserMiddleware {
  public static loginValidation(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Response | void {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'All fields must be filled' });
    }
    next();
  }

  public static emailValidation(email: string) : boolean {
    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    return emailRegex.test(email);
  }

  public static async passwordValidation(password: string, email: string): Promise<boolean> {
    if (password.length < 6) return false;
    const user = await UserModel.findOne({ where: { email } });
    if (!user) return false;
    const validPassword = await compare(password, user.password);
    if (!validPassword) return false;
    return true;
  }

  public static async isValid(email: string, password: string): Promise<boolean> {
    return (
      this.emailValidation(email) && await this.passwordValidation(password, email)
    );
  }
}
