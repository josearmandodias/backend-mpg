import { NextFunction, Request, Response,  } from 'express';

export default (err: any, req: Request, res: Response, next: NextFunction) => {
  res.status(400).send('404 not found');
}