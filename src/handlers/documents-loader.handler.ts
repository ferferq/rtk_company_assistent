import {PDFLoader} from "langchain/document_loaders/fs/pdf";
import {EPubLoader} from "langchain/document_loaders/fs/epub";
import {DocxLoader} from "langchain/document_loaders/fs/docx";
import {TextLoader} from "langchain/document_loaders/fs/text";
import {CSVLoader} from "langchain/document_loaders/fs/csv";
import {DirectoryLoader} from "langchain/document_loaders/fs/directory";
import {DocumentLoader} from "langchain/document_loaders/base";
import {UnstructuredLoader} from "langchain/document_loaders/fs/unstructured";
import { FileConfig } from "../configs/file-config";
import { Config } from "../configs";

export class DocumentsLoaderHandler {
 private fileConfig: FileConfig;
  constructor(config: Config) {
    this.fileConfig = config.files;
  }
  async execute(fileName: string, fileType: string) {
    const loader = this.getDocumentLoader(`${this.fileConfig.folderPathUpdate}/${fileName}`, fileType);
    const document = await loader.load();

    return document;
  }

  private getDocumentLoader(filePath: string, fileType: string): DocumentLoader {
    let loader;
    switch (fileType) {
        case "pdf":
            loader = new PDFLoader(filePath, {
                splitPages: false,
            });
            return loader;
        case "epub":
            loader = new EPubLoader(
                filePath, {
                    splitChapters: false,
                });
            return loader;
        case "docx":
            loader = new DocxLoader(
                filePath
            );
            return loader;
        case "txt":
            loader = new TextLoader(filePath);
            return loader;
        case "md":
            loader = new TextLoader(filePath);
            return loader;
        case "json":
            // JSONLoader is not implemented with split option
            loader = new TextLoader(filePath);
            return loader;
        case "csv":
            loader = new CSVLoader(filePath);
            return loader;
        case "zip":
            return this.getDirectoryLoader(filePath)
        default:
            loader = new UnstructuredLoader(filePath);
            return loader;
    }
  }

  private getDirectoryLoader(path: string): DocumentLoader {
    const zipFilePath = path.split('.')[0];
    return new DirectoryLoader(
      zipFilePath, {
            ".pdf": (path) => this.getDocumentLoader("pdf", path),
            ".epub": (path) => this.getDocumentLoader("epub", path),
            ".txt": (path) => this.getDocumentLoader("txt", path),
            ".docx": (path) => this.getDocumentLoader("docx", path),
            ".json": (path) => this.getDocumentLoader("json", path),
            ".md": (path) => this.getDocumentLoader("md", path),
            ".csv": (path) => this.getDocumentLoader("csv", path),
        }
    );
  }
}