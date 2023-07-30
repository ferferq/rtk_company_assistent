import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { SupabaseVectorStore } from "langchain/vectorstores/supabase";
import { Document } from "langchain/document";
import {createClient} from "@supabase/supabase-js";
import { Config } from "../configs";

export class SupabaseConnection {
  private client;
  constructor(private config: Config) {
    const {supabaseConfig} = this.config;
    this.client = createClient(supabaseConfig.url, supabaseConfig.apiKey);
  }

 public async saveDocuments(documents: Document[]) {
    const supabaseVectorStore = new SupabaseVectorStore(new OpenAIEmbeddings({
      openAIApiKey: this.config.iaConfig.apiKey,
    }),
    { client: this.client, tableName: "documents", queryName: "match_documents" });
  await supabaseVectorStore.addDocuments(documents);
 }
}