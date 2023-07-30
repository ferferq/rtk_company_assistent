import { Config } from "../../../configs";
import { SupabaseConnection } from "../../../dependencies/supabase-connection";
import { DocumentsLoaderHandler } from "../../../handlers/documents-loader.handler";
import { WorkFlowExecutor } from "../../../utils/workflow-executor.util";
import { Store } from "./models";
import { ExtractZipStep, SplitDocumentStep, SaveEmbeddingsStep } from "./steps";

export class FileUpdateWorkflow {
  private workflow = new WorkFlowExecutor<Store>();
  constructor(config: Config, documentsLoaderHandler: DocumentsLoaderHandler, supabaseConnection: SupabaseConnection) {
    this.workflow.withStep(new ExtractZipStep(config));
    this.workflow.withStep(new SplitDocumentStep(config, documentsLoaderHandler));
    this.workflow.withStep(new SaveEmbeddingsStep(supabaseConnection));
  }

  async execute(store: Store) {
    await this.workflow.execute(store);
  }
}