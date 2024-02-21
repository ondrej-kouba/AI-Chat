import './App.css'
import {ChakraProvider} from "@chakra-ui/react";
import {ChatContainer} from "./components/ChatContainer.tsx";

function App() {

  return (
    <ChakraProvider>
        <ChatContainer context="Is OH-SO the opposite of SO-SO?"></ChatContainer>
    </ChakraProvider>
  )
}

export default App
