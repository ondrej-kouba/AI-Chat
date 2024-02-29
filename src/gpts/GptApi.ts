import { RolePlay } from "../roleplays/roleplays";

export interface GptApi<I,O> {
    prompt(text:I, second:boolean, play:RolePlay): Promise<AsyncIterable<O>>;
    extractFromStream(chunk:O):string;
}