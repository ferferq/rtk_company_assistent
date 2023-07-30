import { IStepExecutor } from "../../../../interfaces";
import { Store } from '../models'
import { SupabaseConnection } from "../../../../dependencies/supabase-connection";

export class SaveEmbeddingsStep implements IStepExecutor<Store> {
  constructor(private supabaseConnection: SupabaseConnection) {
  }
  async execute(store: Store): Promise<void> {
    const { splitDocuments } = store;
    await this.supabaseConnection.saveDocuments(splitDocuments);
  }
}