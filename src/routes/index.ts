import express from 'express';
import { routerFiles } from './files.route';

const router = express.Router();
export function routes() {
  router.use('/files', routerFiles);

  return router;
};