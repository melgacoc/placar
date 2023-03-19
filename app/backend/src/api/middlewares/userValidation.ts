import { Request, Response, NextFunction } from 'express';

export default class userValidation {
  public static loginValidation(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Response | void {
    const verifyEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    const result: boolean = verifyEmail.test(req.body.email);
    const invalidField = 'Invalid email or password';
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'All fields must be filled' });
    }

    if (result === false) {
      return res.status(400).json({ message: invalidField });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: invalidField });
    }
    next();
  }
}
