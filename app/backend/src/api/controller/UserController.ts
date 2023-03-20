import { Request, Response, NextFunction } from 'express';
import IUserService from '../interfaces/IServiceUser';

export default class UserController {
  constructor(private userService: IUserService) {}

  public login = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const { email, password } = req.body;
      const token = await this.userService.login(email, password);
      res.status(200).json({ token });
    } catch (error) {
      next(error);
    }
  };

  public findRole = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const { role } = req.body.user;
      console.log(role);
      res.status(200).json({ role });
    } catch (error) {
      next(error);
    }
  };
}
