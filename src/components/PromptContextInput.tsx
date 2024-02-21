import {Button, Input} from '@chakra-ui/react'
import {useState} from "react";

export interface PromptContextInputProps  {
    onClick: (context: string) => void;
}
export const PromptContextInput = ({onClick} : PromptContextInputProps) => {

    const [inputText, setInputText] = useState('');
    return <form>
        <Input  onInput={e => {
            // Fuck off TS.
            setInputText((e.target as any)?.value)
        }} type="text" title="test" placeholder="Enter prompt context" />
        <Button disabled={!inputText.length} onClick={() => {
            onClick(inputText)
        }}>Start Convo</Button>
        </form>
}