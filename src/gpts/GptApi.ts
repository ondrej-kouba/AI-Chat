export interface GptApi<I,O> {
    prompt(text:I): Promise<O>;
}