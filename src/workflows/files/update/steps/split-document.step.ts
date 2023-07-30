import { DocumentsLoaderHandler } from "../../../../handlers/documents-loader.handler";
import { IStepExecutor } from "../../../../interfaces";
import { Store } from '../models'
import { TokenTextSplitter } from "langchain/text_splitter";
import { FileConfig } from "../../../../configs/file-config";
import { Config } from "../../../../configs";

export class SplitDocumentStep implements IStepExecutor<Store> {
  private fileConfig: FileConfig;
  private documentsLoaderHandler: DocumentsLoaderHandler
  constructor(config: Config, documentsLoaderHandler: DocumentsLoaderHandler) {
    this.documentsLoaderHandler = documentsLoaderHandler;
    this.fileConfig = config.files;
  }
  async execute(store: Store): Promise<void> {
    const document = await this.documentsLoaderHandler.execute(store.fileName, store.fileType);
    const splitter = new TokenTextSplitter({
      chunkSize: this.fileConfig.chunkSize,
      chunkOverlap: this.fileConfig.chunkOverlap,
    });
    const splitDocuments = await splitter.splitDocuments(document);
    splitDocuments.map((doc) => {
        doc.metadata = { file_name : store.fileName };
    });
    store.splitDocuments = splitDocuments;
  }
}