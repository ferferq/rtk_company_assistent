import {CallbackManager, NewTokenIndices} from "langchain/callbacks";
import { OpenAIChat } from "langchain/llms/openai";
import {BufferMemory, ChatMessageHistory} from "langchain/memory";
import {LLMChain} from "langchain/chains";

import { Config } from "../configs";
import { Response } from 'express';
import { ChatPromptTemplate, HumanMessagePromptTemplate } from "langchain/prompts";
import { BaseMessage, AIMessage, HumanMessage } from "langchain/schema";

export class OpenIaService {
  constructor(private config: Config) {
  }

  async askMessage(res: Response, messages: any) {
    let input: string;
  if (messages.length === 1) {
    input = messages[0].content;
  } else {
    input = messages[messages.length - 1].content;
  }

  const historyMessages: BaseMessage[] = messages?.slice(0, messages.length - 1)
  .map((message: BaseMessage) => {
    if (message._getType() === 'human') {
      return new HumanMessage(message.content);
    } else if (message._getType() === 'ai') {
      return new AIMessage(message.content);
    }
    throw new TypeError('Invalid message role');
  });

      const llm = new OpenAIChat({
        temperature: 0.9,
        modelName: this.config.iaConfig.model,
        streaming: true,
        openAIApiKey: this.config.iaConfig.apiKey,
        callbacks: this.getCallbackManager(res),
    });

    const promptTemplate = ChatPromptTemplate.fromPromptMessages([
      HumanMessagePromptTemplate.fromTemplate("{input}"),
    ]);

    const memory = new BufferMemory({
      returnMessages: true,
      chatHistory: new ChatMessageHistory(historyMessages),
    });

    const chain = new LLMChain({
      prompt: promptTemplate,
      llm,
      memory,
    });

    await chain.call({ input });
  }

  private getCallbackManager = (res: Response) => {
    return CallbackManager.fromHandlers({
        handleLLMNewToken: async (token: string, idx: NewTokenIndices, runId: string, parentRunId?: string) =>{
            res.write(token);
        },
        handleLLMEnd: async () => {
            res.send();
        },
    })
}
}