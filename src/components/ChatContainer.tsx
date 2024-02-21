import {Flex, Text} from "@chakra-ui/react";
import {ChatBubble, ChatBubbleProps} from "./ChatBubble.tsx";
import {useEffect, useRef, useState} from "react";
import {MockGptApi} from "../gpts/MockGptApi.ts";
import {Colors} from "../colors/Colors.ts";

export interface ChatContainerProps {
    context: string
}

export const ChatContainer = ({context}: ChatContainerProps) => {


    let isPlaying = false;
    const firstGpt = useRef(new MockGptApi());
    const secondGpt = useRef(new MockGptApi());
    const gpts = [firstGpt, secondGpt];

    const [messages, setMessages] = useState<ChatBubbleProps[]>([]);


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
                return [...innerMessages, {
                    message: 'loading..',
                    origin: side === 0 ? 'start' : 'end',
                    name: 'OH-SO',
                    textColor: 'white',
                    color: side === 0 ? Colors.blue : Colors.purple,
                    avatarSrc: '',
                    loading: true
                }]

            })

            const response = await gpt.prompt(i + '. ' + lastContext);

            lastContext = response;

            setMessages((innerMessages) => {

                return [...innerMessages.slice(0, innerMessages.length - 1), {
                    message: response,
                    origin: side === 0 ? 'start' : 'end',
                    name: 'OH-SO',
                    textColor: 'white',
                    color: side === 0 ? Colors.blue : Colors.purple,
                    avatarSrc: '',
                    loading: false
                }]

            })


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