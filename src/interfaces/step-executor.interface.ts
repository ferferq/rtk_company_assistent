export interface IStepExecutor<T> {
  execute(store: T): Promise<void>
}