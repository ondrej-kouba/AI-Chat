import { RolePlay } from "../roleplays/roleplays";
import { GptApi } from "./GptApi"
import ollama, { ChatResponse } from 'ollama'

export class Ollama implements GptApi<string, ChatResponse>{
    extractFromStream(chunk: ChatResponse): string {
        return chunk.message.content;
    }
    async prompt(text: string, second: boolean, play:RolePlay): Promise<AsyncGenerator<ChatResponse>> {
        console.log(text);
        if (second) {
            return await ollama.chat({ model: "neural-chat", messages: [
                { role: 'user', content: play.instructionToAi2 }, { role: 'system', content: text }
            ], stream: true, })
        }
        return ollama.chat({ model: "neural-chat", messages: [{
             role: 'user', content: text }, 
             { role: 'system', content: play.instructionToAi1 }], stream: true });
    }

}