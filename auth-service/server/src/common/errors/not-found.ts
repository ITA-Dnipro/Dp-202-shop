import { Request, Response } from 'express';

export function notFound(req: Request, res: Response): Response {
  return res.status(404).json({message: `API endpoint ${req.baseUrl} doesn't exists!`});
}
