import './App.css'
import {ChakraProvider} from "@chakra-ui/react";
import {ChatContainer} from "./components/ChatContainer.tsx";
import {useState} from "react";
import {PromptContextInput} from "./components/PromptContextInput.tsx";

function App() {


    const [promptContext, setPromptContext] = useState<string | null>(null);
    return (
        <ChakraProvider>
            {!promptContext ? <PromptContextInput onClick={context => setPromptContext(context)} /> :
            <ChatContainer context={promptContext}></ChatContainer>}
        </ChakraProvider>
    )
}

export default App
