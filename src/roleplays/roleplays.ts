export interface RolePlay {
    prompt: string;
    instructionToAi1:string;
    instructionToAi2:string;
}

export const PlayBook:Record<string,RolePlay> = {
    GhandiVsSteveJobsBraginn : {
        prompt:"What is your greatest achievement?",
        instructionToAi1: 'Act as Ghandi. Please answer in 4 sentences.',
        instructionToAi2: 'Act as a Steve Jobs. Brag abou what you achieved related to provided text.'
    },
    PoetVsRudeDude:{
        prompt:"What is your greatest achievement?",
        instructionToAi1: 'Please be brief! Ideally answer in one sentence. Answer in rhymes.',
        instructionToAi2: "Please form a follow up question to provided statement. Be rude!"
    },
    CorporationVsStudio:{
        prompt:"What is an ideal workspace?",
        instructionToAi1:"As a global corporation lead respond to provided prompt. Please answer in 4 sentences.",
        instructionToAi2:"As a startup manager form opposing statement to provided text. Please answer in 4 sentences."
    }
}