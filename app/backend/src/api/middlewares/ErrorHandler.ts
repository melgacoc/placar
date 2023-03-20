import { NextFunction, Request, Response } from 'express';

class ErrorHandler {
  public static handle(
    error: Error,
    _req: Request,
    res: Response,
    _next: NextFunction,
  ): void {
    res.status(401).json({ message: error.message });
  }
}

export default ErrorHandler;
