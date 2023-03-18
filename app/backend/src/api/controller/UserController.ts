import { Request, Response } from 'express';
import IUserService from '../interfaces/IServiceUser';

export default class UserController {
  constructor(private userService: IUserService) {}

  public login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const token = await this.userService.login(email, password);
    return res.status(200).json({ token });
  };
}
