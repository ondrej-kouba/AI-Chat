import { GptApi } from "./GptApi";
import OpenAI from "openai";
import { ChatCompletionChunk } from "openai/resources/index.mjs";

const openai = new OpenAI({
    apiKey:'<INSERT API KEY>',
    dangerouslyAllowBrowser:true
  });

export class ChatGPT implements GptApi<string, ChatCompletionChunk>{
    async prompt(text: string, second: boolean): Promise<AsyncIterable<ChatCompletionChunk>> {
        console.log(text);
        if (second) {
            
            return await openai.chat.completions.create({ model: "gpt-3.5-turbo", messages: [
                { role: 'user', content: "Form a follow up question from provided text. Be rude!"}, { role: 'system', content: text }
            ], stream: true, });
           
        }
        return  await openai.chat.completions.create({ model: "gpt-3.5-turbo", messages: [{
             role: 'user', content: text }, 
             { role: 'system', content: 'Please answer the question in 4 sentences.' }], stream: true });
             
    }
    extractFromStream(chunk:ChatCompletionChunk):string{
        return chunk.choices[0]?.delta?.content || "";
    }
}