import express from 'express';
import { AskMessageController } from '../controllers/message';

const routerMessage = express.Router();
routerMessage.post('/ask', AskMessageController.execute);

export {
  routerMessage,
};