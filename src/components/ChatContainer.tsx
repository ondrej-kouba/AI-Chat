import {Flex, Text} from "@chakra-ui/react";
import {ChatBubble, ChatBubbleProps, createErrorBubbleProps} from "./ChatBubble.tsx";
import {useEffect, useRef, useState} from "react";
import {Colors} from "../colors/Colors.ts";
import { Ollama } from "../gpts/Ollama.ts";
import { ChatGPT } from "../gpts/ChatGPT.ts";

export interface ChatContainerProps {
    context: string
}


// Fuck this type.
const gptBubbleData: Record<number, Exclude<ChatBubbleProps, ChatBubbleProps['message'] | ChatBubbleProps['loading']>> = {
    // 0 is on the left, 1 is on the right
    // @ts-ignore
    0: {
        name: 'OH-SO',
        avatarSrc: '',
        color: Colors.blue,
        textColor: 'white',
        origin:'start',
    },
    // @ts-ignore
    1: {
        name: 'SO-SO',
        avatarSrc: '',
        color: Colors.purple,
        textColor: 'white',
        origin: 'end'
    }
}


export const ChatContainer = ({context}: ChatContainerProps) => {


    let isPlaying = false;
    const firstGpt = useRef(new ChatGPT());
    const secondGpt = useRef(new ChatGPT());
    const gpts = [firstGpt, secondGpt];

    const [messages, setMessages] = useState<ChatBubbleProps[]>([]);


    const replaceMessages = (newMessage: ChatBubbleProps) => {
        setMessages((innerMessages) => {
            return [...innerMessages.slice(0, innerMessages.length - 1), newMessage]
        })
    }

    const playMessages = async () => {
        let lastContext = context
        for (let i = 0; i < 10; i++) {
            const side = i % 2;
            const gpt = gpts[side].current;


            /*
                Or just render another empty ChatMessage in the render with loading = true.
                But nobody ain't got time fo' dat.
             */
            setMessages((innerMessages) => {
                // @ts-ignore
                return [...innerMessages, {
                    ...gptBubbleData[side],
                    message: 'loading..',
                    loading: true
                }]

            })


            try {
                const response = await gpt.prompt(lastContext, !!side);
                if(typeof response === "string")
                {
                    lastContext = response;

                    replaceMessages({
                        ...gptBubbleData[side],
                        message: response,
                        loading: false
                    })
                }
                else {
                    let responseText:string = "";
                    for await (const part of response) {
                        responseText += gpt.extractFromStream(part);
                        replaceMessages({
                            ...gptBubbleData[side],
                            message: responseText,
                            loading: false
                        });  
                    }
                    lastContext=responseText;
                     
                }
            } catch (e) {
                console.error("GptApi Prompting failed: ", e)
                replaceMessages(createErrorBubbleProps({
                    ...gptBubbleData[side],
                    error: "Failed to fetch from GPT API. This is faked error with 30% probability, don't be alarmed.",
                    name: 'OH-SO',
                }))
                // TODO: Decrement `i` ? And maybe come up with better loop altogether.
            }
        }
    }

    useEffect(() => {
        // Fucking React triggers this useEffect twice
        // Do not use React 18 ;) 
        if (!isPlaying) {
            isPlaying = true;
            playMessages()
        }
    }, [])


    return <Flex gap="4" w="100%" direction="column" p={4}>
        <Text fontSize="xx-large">{context}</Text>
        {messages.map((message, i) => <ChatBubble key={i} {...message} />)}
    </Flex>
}