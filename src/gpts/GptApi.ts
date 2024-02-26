export interface GptApi<I,O> {
    prompt(text:I, second:boolean): Promise<AsyncIterable<O>>;
    extractFromStream(chunk:O):string;
}