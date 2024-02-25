export interface GptApi<I,O> {
    prompt(text:I, second:boolean): Promise<O>;
}