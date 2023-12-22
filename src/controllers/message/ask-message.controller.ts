import { Request, Response } from 'express';

export class AskMessageController {
  static async execute(req: Request, res: Response) {
    return res.status(200).json({ message:  '' });
  }
}