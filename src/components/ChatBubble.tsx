import {Avatar, Box, Flex, SkeletonText, Text} from "@chakra-ui/react";

export interface ChatBubbleProps {
    name: string,
    avatarSrc: string,
    message: string,
    color: string,
    textColor: string,
    origin: "start" | "end"
    loading: boolean
}

export const ChatBubble = ({name, avatarSrc, message, color, textColor, origin, loading}: ChatBubbleProps) => {

    return <Flex gap={2} maxW="85%" alignSelf={origin === "start" ? "flex-start" : "flex-end"}>
        {!origin || origin === "start" ? <Avatar name={name} src={avatarSrc}/> : null}
        <Flex direction="column" alignItems={origin || "start"}>
            <Text fontSize="x-small">{name}</Text>
            <Box borderRadius={10} bg={color || 'green'}>
                <SkeletonText py={2} px={4} isLoaded={!loading}>
                    <Text textAlign="start" color={textColor || 'white'} fontSize="lg">{message}</Text>
                </SkeletonText>
            </Box>
        </Flex>
        {origin === "end" ? <Avatar name={name} src={avatarSrc}/> : null}
    </Flex>

}