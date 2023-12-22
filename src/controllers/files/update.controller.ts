import { Request, Response } from 'express';
import { Store } from '../../workflows/files/update/models';
import { FileUpdateWorkflow } from '../../workflows/files/update/update-workflow';

export class UpdateController {
  static async execute(req: Request, res: Response) {
    const { dependencies } = (req as any).context;
    const { filename, originalname } = req.file!;
    const workflow = new FileUpdateWorkflow(dependencies.config, dependencies.documentsLoaderHandler, dependencies.supabaseConnection);
    const store = new Store(filename, originalname);
    await workflow.execute(store);
  
    return res.status(200).json({ message:  store.splitDocuments });
  }
}