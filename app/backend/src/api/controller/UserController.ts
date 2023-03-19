import { Request, Response } from 'express';
import IUserService from '../interfaces/IServiceUser';

export default class UserController {
  constructor(private userService: IUserService) {}

  public login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const token = await this.userService.login(email, password);
    if (!token) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    return res.status(200).json({ token });
  };

  public role = async (req: Request, res: Response) => {
    const { email } = req.body;
    const role = await this.userService.role(email);
    if (!role) {
      return res.status(400).json({ message: 'Invalid email' });
    }
    return res.status(200).json({ role });
  };
}
