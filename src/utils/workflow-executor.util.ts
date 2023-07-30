import { IStepExecutor } from "../interfaces";

export class WorkFlowExecutor<T> {
  private steps: Array<IStepExecutor<T>>;

  constructor() {
    this.steps = [];
  }
  
  withStep(step: IStepExecutor<T>) {
    this.steps.push(step)
  }

  async execute(store: T) {
    for(let i=0; i < this.steps.length; i++) {
      const step = this.steps[i];
      await step.execute(store);
    }
  }
}