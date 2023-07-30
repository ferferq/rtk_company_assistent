import { IStepExecutor } from "../../../../interfaces";
import { Store } from '../models';
import AdmZip from 'adm-zip';
import { Config } from '../../../../configs';
import { FileConfig } from "../../../../configs/file-config";

export class ExtractZipStep implements IStepExecutor<Store> {
  private fileConfig: FileConfig;
  constructor(config: Config) {
    this.fileConfig = config.files;
  }
  async execute(store: Store): Promise<void> {
    if (store.fileType !== 'zip') {
      return;
    }
    const { fileName } = store;
    const folderPath = this.fileConfig.folderPathUpdate;
    const zip = new AdmZip(`${folderPath}/${store.fileName}`);
    const finalPath = `${folderPath}/${fileName.split('.')[0]}`;
    zip.extractAllTo(finalPath, true);
  }

}