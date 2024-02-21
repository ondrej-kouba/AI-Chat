import {Flex, Text} from "@chakra-ui/react";
import {ChatBubble, ChatBubbleProps, createErrorBubbleProps} from "./ChatBubble.tsx";
import {useEffect, useRef, useState} from "react";
import {MockGptApi} from "../gpts/MockGptApi.ts";
import {Colors} from "../colors/Colors.ts";

export interface ChatContainerProps {
    context: string
}


const gptBubbleData = {
    // 0 is on the left, 1 is on the right
    0: {
        name: 'OH-SO',
        avatarSrc: '',
        color: Colors.blue,
        textColor: 'white',
        origin:'start',
    },
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
    const firstGpt = useRef(new MockGptApi());
    const secondGpt = useRef(new MockGptApi());
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
                const response = await gpt.prompt(i + '. ' + lastContext);
                lastContext = response;

                replaceMessages({
                    ...gptBubbleData[side],
                    message: response,
                    loading: false
                })
            } catch (e) {
                console.error("GptApi Prompting failed: ", e)
                replaceMessages(createErrorBubbleProps({
                    ...gptBubbleData[side],
                    error: "Failed to fetch from GPT API.",
                    name: 'OH-SO',
                }))
                // TODO: Decrement `i` ? And maybe come up with better loop altogether.
            }
        }
    }

    useEffect(() => {
        // Fucking React triggers this useEffect twice
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