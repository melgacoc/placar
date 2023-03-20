import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

const secret: string = process.env.JWT_SECRET || 'theSecret';

export default class tokenValidation {
  public static tokenValidation(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Response | void {
    const token = req.header('Authorization');
    if (!token) {
      return res.status(401).json({ message: 'Token not found' });
    }
    try {
      const verifyToken = jwt.verify(token, secret); // Qual o retorno?
      req.body.user = verifyToken;
      next();
    } catch (err) {
      throw new Error('Token must be a valid token');
    }
  }
}
