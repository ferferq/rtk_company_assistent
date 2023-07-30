import { FileConfig } from "./file-config";
import { IaConfig } from "./ia-config";
import { SupabaseConfig } from "./supabase-config";

export class Config {
  public files = new FileConfig();
  public iaConfig = new IaConfig();
  public supabaseConfig = new SupabaseConfig();
}