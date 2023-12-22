import {v4 as uuIdv4} from 'uuid';

import { Config } from '../configs';
import express from 'express';
import multer from 'multer';
import { UpdateController } from '../controllers/files';

const routerFiles = express.Router();

const config = new Config();

const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, config.files.folderPathUpdate);
    },
    filename: function (req, file, cb) {
    const fileName = uuIdv4();
    const fileType = file.originalname.split('.').pop()!;
      cb(null, `${fileName}.${fileType}`)
    }
  }),
});

routerFiles.post('/', upload.single('file'), UpdateController.execute);

export {
  routerFiles,
};