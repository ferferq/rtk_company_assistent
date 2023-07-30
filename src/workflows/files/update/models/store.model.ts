import { Document } from "langchain/document";

export class Store {
  public fileName: string;
  public originalname : string;
  public fileType: string;
  public splitDocuments: Document[];
  constructor(filename: string, originalname: string) {
    this.fileName = filename;
    this.originalname = originalname;
    this.fileType =  filename.split('.').pop()!;
    this.splitDocuments = [];
  }
} 