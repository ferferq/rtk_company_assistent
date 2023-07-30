import { Config } from '../../configs';
import { Request, Response } from 'express';
import { DocumentsLoaderHandler } from '../../handlers/documents-loader.handler';
import { Store } from '../../workflows/files/update/models';
import { FileUpdateWorkflow } from '../../workflows/files/update/update-workflow';
import { SupabaseConnection } from '../../dependencies';

export const updateController = async (req: Request, res: Response) => {
  const { filename, originalname } = req.file!;
  const config = new Config();
  const documentsLoaderHandler = new DocumentsLoaderHandler(config);
  const supabaseConnection = new SupabaseConnection(config);
  const workflow = new FileUpdateWorkflow(config, documentsLoaderHandler, supabaseConnection);
  const store = new Store(filename, originalname);
  await workflow.execute(store);

  return res.status(200).json({ message:  store.splitDocuments });
};